import type { CartItem, Coupon, Discount, Promotion, QuantityGift, Weight } from "types/orderTypes";
const notify = useNotify();

export const useCartStore = defineStore('cart', () => {
    const apiUrl = useApi();

    const error = ref<number>(0)

    // state
    const addCartItems = ref<CartItem[]>([])
    const buyNowItem = ref<CartItem | null>(null)

    const dataWeight = ref<Weight[]>([])
    const dataDiscount = ref<Discount | null>(null)
    const dataVariant = ref<string[]>([]);
    const dataPromotions = ref<Promotion[]>([])

    const valueTaxLocal = ref<number>(0) // state tax local
    const listGiftChecked = ref<QuantityGift[]>([])
    const discountValue = ref<number>(0)
    const couponValue = ref<number>(0)
    const typeCoupon = ref<string>('') // 'shipping' | 'discount'
    const isPutCart = ref<boolean>(false)

    const productStore = useProductStore()
    const authStore = useAuthStore()

    //const token = useCookie('tokenAccess').value;
    const token = () => useCookie('tokenAccess').value;

    // local caches & timers
    const productCache = new Map<number, { dataProduct: any; dataSkus: any; typeValue: string }>();
    let saveTimer: ReturnType<typeof setTimeout> | null = null;
    let discountTimer: ReturnType<typeof setTimeout> | null = null;

    //****************************** GET ******************************//

    const cartCount = computed(() => addCartItems.value.length);

    const dataProductShow = computed<CartItem[]>(() => {
        return buyNowItem.value ? [buyNowItem.value] : addCartItems.value
    });

    const cartSummary = computed(() => {
        const base = dataProductShow.value.reduce(
            (total, item) => {
                total.subTotal += (item.salePrice != 0 ? item.salePrice : item.price) * item.quantity;
                total.weight   += item.weight * item.quantity;
                total.tax      += item.tax || 0;
                return total;
            },
            { subTotal: 0, weight: 0, tax: 0 }
        );

        // cộng thêm weight quà tặng
        for (const gift of listGiftChecked.value) {
            // tìm thông tin sản phẩm quà tặng trong giỏ
            const giftItem = addCartItems.value.find(i => i.skuId === gift.skuId);
            if (giftItem) {
                base.weight += giftItem.weight * gift.quantity;
            }
        }

        return base;
    });

    const subTotal = computed(() => {
        return cartSummary.value.subTotal;
    });

    const weightsTotal = computed(() => {
        return cartSummary.value.weight;
    });

    const taxProductTotal = computed(() => {
        return cartSummary.value.tax;
    });

    const taxTotal = computed(() => {
        const couponValueType = typeCoupon.value === 'shipping' ? couponValue.value : 0;
        const shippingAfterCoupon = Math.max(shippingFee.value - couponValueType, 0);
        return taxProductTotal.value + shippingAfterCoupon * valueTaxLocal.value;
    });

    const orderTotal = computed(() => {
        const shippingAfterCoupon = Math.max(shippingFee.value - (typeCoupon.value === 'shipping' ? couponValue.value : 0), 0)
        const total = subTotal.value + shippingAfterCoupon + taxTotal.value - discountValue.value - (typeCoupon.value === 'discount' ? couponValue.value : 0);
        return total;
    });

    const shippingFee = computed(() => {
        if (!dataWeight.value.length) return 0;

        const weight = weightsTotal.value;
        const found = dataWeight.value.find(w => weight <= w.zoneTo);

        return found ? found.fee : dataWeight.value.at(-1)?.fee || 0;
    });

    const dataPromotion = computed<Promotion[]>(() => {
        return dataPromotions.value;
    });

    const quantityGift = computed<QuantityGift[]>(() => {
        return listGiftChecked.value;
    });

    //******************************************************** ACTIONS ********************************************************//

    // small helpers
    const successNotify = (msg: string) => notify({ message: msg, type: 'success', time: 3000 });
    const errorNotify = (msg: string) => notify({ message: msg, type: 'error', time: 3000 });              
    
    // debounce localStorage
    const scheduleSaveToLocal = () => {
        if (saveTimer) clearTimeout(saveTimer)
        saveTimer = setTimeout(() => {
            localStorage.setItem('cart_data', JSON.stringify(addCartItems.value))
            saveTimer = null
        }, 300) // 300ms delay tránh việc ghi quá nhiều lần trong thời gian ngắn (ví dụ khi tăng giảm số lượng)
    }

    const savePromotionsToLocal = () => {   
        localStorage.setItem('dataPromotions_data', JSON.stringify(dataPromotions.value));
    }

    // debounce discount API calls
    const scheduleFetchDiscount = (subtotal: number) => {
        if (discountTimer) clearTimeout(discountTimer)
        discountTimer = setTimeout(() => fetchDiscount(subtotal), 400) // tránh việc gọi API quá nhiều lần khi subtotal thay đổi nhanh
    }

    // GET DATA CART FROM SERVER
    const fetchDataCart = async () => {
        if (!authStore.authenticated || !token()) return;
        console.log('đã kêu fetchcart')
        try {
            const dataCartResponse = await $fetch<{ error: number; data: string }>(`${apiUrl}carts`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token()}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log(dataCartResponse.data)

            let serverCart: any[] = [];

            if (dataCartResponse?.data) {
                try {
                    serverCart = JSON.parse(dataCartResponse.data);
                } catch {
                    serverCart = [];
                }
            }

            // CASE 1: Server có dữ liệu
            if (serverCart.length > 0) {
                //addCartItems.value = [];
                isPutCart.value = true;

                await Promise.all(
                    serverCart.map((item: any) =>
                    addProductToCart(Number(item.skuId), Number(item.quantity), true)
                    )
                );

                localStorage.setItem("cart_data", JSON.stringify(serverCart));
                await syncCart();
            }

            // CASE 2: Server rỗng nhưng local có cart → đẩy local lên
            else if (addCartItems.value.length > 0) {
                await syncCart();
            }

        } catch (err) {
            console.error("Error fetching cart:", err);
            error.value = 1;
        }

    }

    // ADD PRODUCT TO CART
    const addProductToCart = async (idSku:number, quantity: number, replace = false) => {
        let cached = productCache.get(idSku);
        
        // Kiểm tra nếu đã có trong cache thì dùng luôn tránh gọi API nhiều lần
        if (!cached) {
            try {
                const product = await getDataProduct(idSku);
                cached = {
                    dataProduct: product.dataProduct,
                    dataSkus: product.dataSkus,
                    typeValue: product.typeValue
                };
                productCache.set(idSku, cached);
            } catch (err) {
                console.error("Error fetching product:", err);
                return;
            }
        } 

        const existing = addCartItems.value.find(item => item.skuId === idSku);

        if(existing) {
            existing.quantity = replace ? quantity : existing.quantity + quantity;
        } else {     
            addCartItems.value.push({
                skuId: idSku,
                title: cached.dataProduct?.title || '',
                type: cached.typeValue === 'default' ? '' : cached.typeValue,
                price: Number(cached.dataSkus?.price ) || 0,
                quantity,
                weight: Number(cached.dataSkus?.weight) || 0,
                tax: Number(cached.dataProduct?.tax) || 0,   
                media: cached.dataProduct.media || '',
                productId: cached.dataProduct.id || 0,
                salePrice: Number(cached.dataSkus?.salePrice) || 0,
            });
        }    
        checkQuantityGift(idSku, existing ? existing.quantity : quantity);
        scheduleSaveToLocal();
        addDataCartToServer();
    }

    // CLICK ADD TO CART
    const getDataAddCart = async (idSku:number, quantity: number) => {
        await addProductToCart(idSku, quantity);
        successNotify('Added to cart!');
    }

    // CLICK BUY NOW
    const getDataBuyNow = (idSku: number, quantity: number) => {       
        buyNowItem.value = null;
        const checkoutData = { idSku, quantity };
        sessionStorage.setItem('checkout_data', JSON.stringify(checkoutData))
        successNotify('Buy now item added!');
    }

    // DATA CART BUY NOW
    const dataCartBuyNow = async () => {
        const raw = sessionStorage.getItem('checkout_data');
        const checkoutData = raw ? JSON.parse(raw) : null;
        if (!checkoutData) return;

        const { idSku, quantity = 1 } = checkoutData;

        // reuse cache
        let cached = productCache.get(idSku);
        
        if (!cached) {
            const product = await getDataProduct(idSku)
            cached = { dataProduct: product.dataProduct, dataSkus: product.dataSkus, typeValue: product.typeValue }
            productCache.set(idSku, cached)
        }

        await fetchPromotion(idSku);

        if (cached.dataProduct) {
            buyNowItem.value = {
                skuId: idSku,
                title: cached.dataProduct?.title,
                price: Number(cached.dataSkus?.price) || 0,
                type: cached.typeValue === 'default' ? '' : cached.typeValue,
                quantity,
                weight: Number(cached.dataSkus?.weight) || 0,
                tax: Number(cached.dataProduct?.tax) || 0,
                media: cached.dataProduct.media || '',
                productId: cached.dataProduct.id || 0,
                salePrice: Number(cached.dataSkus?.salePrice) || 0,
            }
        }

        checkQuantityGift(idSku, buyNowItem.value?.quantity ?? quantity);
    }

    //ADD DATA PRODUCT TO SERVER
    const addDataCartToServer = () => {
        if (authStore.authenticated && token()) {
            console.log(authStore.authenticated)
            console.log(token())
            syncCart();
        }
    }

    //sync cart
    const syncCart  = async () => {
        const skuIdList = addCartItems.value.map(item => ({ 
            skuId: item.skuId, 
            quantity: item.quantity 
        }));

        try {
            const method = isPutCart.value ? 'PUT' : 'POST';

            await $fetch<{ error: number; data: string }>(`${apiUrl}carts`, {
                method,
                headers: {
                    Authorization: `Bearer ${token()}`,
                    'Content-Type': 'application/json',
                },
                body: { skuIdList: JSON.stringify(skuIdList) },
            });

            error.value = 0;
        } catch (err) {
            console.error("Error posting cart:", err)
            error.value = 1;
        }
    }

    //Clear Cart
    const clearCart = async () => {
        try {
            await $fetch<{ error: number; data: string }>(`${apiUrl}carts`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token()}`,
                    'Content-Type': 'application/json',
                },
                body: { skuIdList: JSON.stringify([]) },
            });
            error.value = 0;
        } catch (err) {
            console.error("Error posting cart:", err)
            error.value = 1;
        }
    }

    //LOAD PRODUCT
    const getDataProduct = async (idSku : number) => {
        await productStore.fetchProductDetailSkus(idSku);
        const dataSkus = productStore.productDetailSkus;

        const idPro = Number(dataSkus?.productId);        
        await productStore.fetchProductWithId(idPro);
        const dataProduct = productStore.product;

        await fetchVariant(idSku);
        const typeValue = dataVariant.value.join(', ');

        await fetchPromotion(idSku);

        return { dataProduct, typeValue, dataSkus }
    }

    //*********************** - FETCH - ***********************//

    //DISCOUNT
    const fetchDiscount = async (subtotal : number) => {
        try {
            const dataDis = await $fetch<{ error: number; data: Discount; message: string }>(`${apiUrl}discounts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: { subtotal }
            })

            const dis = dataDis.data;

            if (!dis) {
                discountValue.value = 0
                dataDiscount.value = null
                error.value = 0
                return discountValue
            }

            if (dis.discountBasedOn === 'percent') {
                discountValue.value = (dis.discountValue / 100) * subTotal.value
            } else if (dis.discountBasedOn === 'value') {
                discountValue.value = dis.discountValue
            } else {
                discountValue.value = 0
            }

            dataDiscount.value = dis;
            error.value = 0;
            return discountValue;

        } catch (err) {
            error.value = 1
            console.error("Error fetching discounts:", err)
            return 0
        }
    }

    //PROMOTIONS
    const fetchPromotion = async (skuId: number) => {
                
        try {
            const promotionRes = await $fetch<{ error: number; data: Promotion ; message: string }>(`${apiUrl}promotions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: { skuId : skuId }
            })

            if (promotionRes?.data) {
                const exists = dataPromotions.value.find(p => p.skuIdIn === promotionRes.data.skuIdIn)
                if (!exists) dataPromotions.value.push(promotionRes.data)
            }

            error.value = 0;
            return dataPromotions;

        } catch (err) {
            error.value = 1
            console.error("Error fetching discounts:", err);
            return dataPromotions;
        }
    }

    // VARIANT-OPTIONS
    const fetchVariant = async (idSku : number) => {
        try {
            const data = await $fetch<{ error: number; data: { name: string }[] }>(`${apiUrl}skus/${idSku}/variant-options`)
            dataVariant.value = data?.data.map(item => item.name) || [];
            error.value = 0;
            return dataVariant.value;
        } catch (err) {
            error.value = 1
            console.error("Error fetching variant options:", err)
            return []
        }
    }

    // WEIGHTS
    const fetchWeights = async () => {
        try {
            const data = await $fetch<{ error: number; data: Weight[]; message: string }>(`${apiUrl}weights`)
            dataWeight.value = data?.data || []
            error.value = 0;
        } catch (err) {
            error.value = 1
            console.error("Error fetching weights:", err)
        }
    }

    // COUPON
    const fetchCoupon = async (code:string) => {
        try {
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
            };

            if (code === "FIRSTORDER") {
                headers["Authorization"] = `Bearer ${token()}`;
            }

            const dataCoupon = await $fetch<{ error: number; data: Coupon; message: string }>(`${apiUrl}coupons`, {
                method: 'POST',
                headers,
                body: { code }
            })

            if (dataCoupon?.data) {
                const coupon = dataCoupon.data;

                if (coupon.type === 'shipping') {
                    if (coupon.discountBasedOn === 'percent') {
                        couponValue.value = (coupon.codeValue / 100) * shippingFee.value;
                    } else if (coupon.discountBasedOn === 'value') {
                        couponValue.value = coupon.codeValue;
                    } else {
                        couponValue.value = 0;
                    }
                }

                if (coupon.type === 'discount') {
                    if (coupon.discountBasedOn === 'percent') {
                        couponValue.value = (coupon.codeValue / 100) * subTotal.value;
                    } else if (coupon.discountBasedOn === 'value') {
                        couponValue.value = coupon.codeValue;
                    } else {
                        couponValue.value = 0;
                    }
                }

                typeCoupon.value = coupon.type;
                successNotify('Coupon Code Applied Successfully!')
            } else {
                couponValue.value = 0;
                errorNotify(dataCoupon.message);
            }

            error.value = 0;
            return couponValue.value;

        } catch (err) {
            error.value = 1
            console.error("Error fetching coupons:", err);
            return 0;
        }
    }

    // ******************** // ******************** // ********************  UI & CHECK  ******************** // ******************** // ******************** //

    // Khi store khởi tạo → load cart từ localStorage
    const loadCartFromStorage = () => {
        //console.log('mới kêu nè')
        const raw = localStorage.getItem('cart_data')
        addCartItems.value = raw ? JSON.parse(raw) : [];

        const promoRaw = localStorage.getItem('dataPromotions_data');
        dataPromotions.value = promoRaw ? JSON.parse(promoRaw) : [];

        if (addCartItems.value.length && dataPromotions.value.length) {
            for (const item of addCartItems.value) {
                checkQuantityGift(item.skuId, item.quantity);
            }
        }
    }

    // Khi reload → xoá BuyNow (vì chỉ dùng 1 lần)
    const clearBuyNowOnReload = () => {
        buyNowItem.value = null
        sessionStorage.removeItem('checkout_data')
    }

    // clear data -> logout
    const clearLocalCart = () => {
        addCartItems.value = []
        dataPromotions.value = []
        //localStorage.removeItem('cart_data')
        //localStorage.removeItem('dataPromotions_data')
    }

    //remove product cart
    const removeItem = (index: number) => {
        if (buyNowItem.value) {
            buyNowItem.value = null;
            sessionStorage.removeItem('checkout_data');
        } else {
            addCartItems.value.splice(index, 1);
            scheduleSaveToLocal();
            addDataCartToServer();
        }
    }

    // remove gift
    const removeGift = (skuId: number) => {
        listGiftChecked.value = listGiftChecked.value.filter(g => g.skuId !== skuId);
    }

    // remove code coupon
    const cancelCodeCoupon = () => {
        couponValue.value = 0;
    }

    // quantity +
    const increment = (item: CartItem) => {
        if (buyNowItem.value && buyNowItem.value.skuId === item.skuId) {
            // Trường hợp Buy Now
            buyNowItem.value.quantity++
        } else {
            // Trường hợp giỏ hàng
            const target = addCartItems.value.find(qty => qty.skuId === item.skuId)
            if (target) {
                target.quantity++;              
                checkQuantityGift(target.skuId, target.quantity);   
            }
            
        }
        scheduleSaveToLocal();
        addDataCartToServer();    
    }

    // quantity -
    const decrement = (item: CartItem) => {
        if (buyNowItem.value && buyNowItem.value.skuId === item.skuId) {
            if (buyNowItem.value.quantity > 1) {
                buyNowItem.value.quantity--
            }
        } else {
            const target = addCartItems.value.find(qty => qty.skuId === item.skuId)
            if (target && target.quantity > 1) {
                target.quantity--;
                checkQuantityGift(target.skuId, target.quantity);   
            }
        }
        scheduleSaveToLocal();
        addDataCartToServer();
    }

    // check quantity gift
    const checkQuantityGift = (idSku : number, quantity : number) => {       
        const promotionCheck = dataPromotions.value.find(p => p.skuIdOut === idSku);
        const qtyIn = promotionCheck?.quantityIn || 1;
        const qtyGiftMax = promotionCheck?.quantityOutMax || 1;

        if (quantity >= qtyIn && promotionCheck) {
            const qtyGift = Math.min(Math.floor(quantity / qtyIn), qtyGiftMax);

            // Giới hạn số lượng quà tặng hiển thị không vượt quá quantityOutMax
            const exists = listGiftChecked.value.find(p => p.skuId === promotionCheck.skuIdOut);
            if (exists) exists.quantity = qtyGift;
            else listGiftChecked.value.push({ skuId: promotionCheck.skuIdOut, quantity: qtyGift });

        } else {
            listGiftChecked.value = listGiftChecked.value.filter(p => p.skuId !== promotionCheck?.skuIdOut)
        }
        return listGiftChecked.value;
    }

    //check tax local
    const checklocalTax = (stateId : string) => {
        valueTaxLocal.value = stateId === 'TX' ? 0.0825 : 0; // Texas - other states
    }

    // Lưu cartPro vào localStorage khi thay đổi (debounced)
    watch(addCartItems, () => scheduleSaveToLocal(), { deep: true });

    // Lưu data vào localStorage
    watch(dataPromotions, () => savePromotionsToLocal(), { deep: true });

    // Check discounts (debounced)
    watch(subTotal, (newSubtotal) => {
        if (newSubtotal > 0) scheduleFetchDiscount(newSubtotal)
        else {
            dataDiscount.value = null;
            discountValue.value = 0;
        }
    });

    return {
        // state
        addCartItems,
        buyNowItem,
        dataWeight,
        dataPromotion,


        // getters
        cartCount,
        dataProductShow,
        subTotal,
        weightsTotal,
        shippingFee,
        orderTotal,
        taxTotal,
        taxProductTotal,
        discountValue,
        quantityGift,
        couponValue,


        // actions
        fetchDataCart,
        fetchWeights,
        fetchDiscount,
        fetchPromotion,
        fetchCoupon,


        getDataAddCart,
        getDataBuyNow,
        dataCartBuyNow,


        loadCartFromStorage,
        clearBuyNowOnReload,
        clearLocalCart,
        clearCart,
        removeItem,
        removeGift,
        increment,
        decrement,
        checklocalTax,
        cancelCodeCoupon,

    }
  
});