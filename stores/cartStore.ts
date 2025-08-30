import type { CartItem, Discount, Promotion, Weight } from "types/orderTypes";
const notify = useNotify();

export const useCartStore = defineStore('cart', () => {
    const config = useRuntimeConfig()
    const apiUrl = config.public.apiBaseUrl
    const error = ref<number>(0)

    // state
    const addCartItems = ref<CartItem[]>([])
    const buyNowItem = ref<CartItem | null>(null)

    const dataWeight = ref<Weight[]>([])
    const dataDiscount = ref<Discount | null>(null)
    const dataVariant = ref<String[]>([])
    const dataPromotion = ref<Promotion | null>(null)
    const listPromotion = ref<Promotion[]>([])
    const discountValue = ref<number>(0)

    const productStore = useProductStore()
    const authStore = useAuthStore()

    const token = useCookie('tokenAccess').value;

    //****************************** GET ******************************//

    const cartCount = computed(() => addCartItems.value.length)

    const dataShow = computed<CartItem[]>(() => {
        return buyNowItem.value ? [buyNowItem.value] : addCartItems.value
    });

    const subTotal = computed(() => {
        return dataShow.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
    });

    const weightsTotal = computed(() => {
        return dataShow.value.reduce((sum, item) => sum + item.weight * item.quantity, 0)
    });

    const shippingFee = computed(() => {
        if (!dataWeight.value.length) return 0;

        const weight = weightsTotal.value
        const found = dataWeight.value.find(w => weight <= w.zoneTo)

        return found ? found.fee : dataWeight.value.at(-1)?.fee || 0;
    });

    const orderTotal = computed(() => {
        return subTotal.value + shippingFee.value - discountValue.value;
    });
   
    //******************************************************** ACTIONS ********************************************************//

    // GET DATA CART FROM SERVER
    const fetchDataCart = async () => {
        if (authStore.authenticated && token) {
            try {
                const dataCartResponse = await $fetch<{ error: number; data: string }>(`${apiUrl}carts`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                })

                if (dataCartResponse.data) {  
                    addCartItems.value = [];    
                    const serverCart = JSON.parse(dataCartResponse.data);
                   
                    await Promise.all(
                        serverCart.map((i: any) => addProductToCart(i.skuId, i.quantity || 1))
                    );
                } 

            } catch (err) {
                console.error("Error fetching cart:", err)
            }

        } else {
            const localCart = localStorage.getItem('cart_data')
            addCartItems.value = localCart ? JSON.parse(localCart) : [];
        }   
    }

    // ADD PRODUCT TO CART
    const addProductToCart = async (idSku:number, quantity: number) => {
        const product = await getDataProduct(idSku);
        await fetchPromotion(idSku);
        const existing = addCartItems.value.find(item => item.skuId === idSku);

        const dataPromotion =  await checkPromotion(idSku, quantity);

        if(existing) {
            existing.quantity += quantity;
        } else {
            addCartItems.value.push({
                skuId: idSku,
                title: product.dataProduct?.title || '',
                type: product.typeValue === 'default' ? '' : product.typeValue,
                price: Number(product.dataSkus?.price) || 0,
                quantity,
                weight: Number(product.dataSkus?.weight) || 0,
                namePromotion: dataPromotion?.skuNameIn || '',
                qtyProductOfPromotion: dataPromotion?.quantityOutMax || 0,
            });
        }        
    }

    // CLICK ADD TO CART
    const getDataAddCart = async (idSku:number, quantity: number) => {
        await addProductToCart(idSku, quantity);
        addDataCartToServer();
         notify({ message: 'Added to cart!', type: 'success', time: 3000 });
    }

    // CLICK BUY NOW
    const getDataBuyNow = (idSku: number, quantity: number) => {       
        buyNowItem.value = null;
        const checkoutData = { idSku, quantity };
        sessionStorage.setItem('checkout_data', JSON.stringify(checkoutData))
        notify({ message: 'Buy now item added!', type: 'success', time: 3000 })
    }

    // DATA CART BUY NOW
    const dataCartBuyNow = async () => {
        const raw = sessionStorage.getItem('checkout_data');
        const checkoutData = raw ? JSON.parse(raw) : null;
        if (!checkoutData) return

        const { idSku, quantity = 1 } = checkoutData;
        const product = await getDataProduct(idSku);
        await fetchPromotion(idSku);
       
        if (product.dataProduct) {
            buyNowItem.value = {
                skuId: Number(product.dataProduct?.id),
                title: product.dataProduct?.title,
                price: Number(product.dataSkus?.price) || 0,
                type: product.typeValue === 'default' ? '' : product.typeValue,
                quantity,
                weight: Number(product.dataSkus?.weight) || 0,
                namePromotion: '',
                qtyProductOfPromotion: 0,
            }
        }
    }

    //ADD DATA PRODUCT TO SERVER
    const addDataCartToServer = () => {
        if (authStore.authenticated && token) {
            syncCart();
        }
    }

    const syncCart  = async () => {

        const skuIdList = addCartItems.value.map(item => ({
            skuId: item.skuId,
            quantity: item.quantity
        }));

        const cartQty = addCartItems.value.length;

        try {

            if (cartQty < 1) {
                // Nếu giỏ hàng rỗng -> POST
                await $fetch<{ error: number; data: string }>(`${apiUrl}carts`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: { 
                        skuIdList: JSON.stringify(skuIdList) 
                    },
                })
            } else {
                // Nếu giỏ hàng đã có sản phẩm -> PUT
                await $fetch<{ error: number; data: string }>(`${apiUrl}carts`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: { 
                        skuIdList: JSON.stringify(skuIdList) 
                    },
                })
            }

        } catch (err) {
            console.error("Error posting cart:", err)
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
        
        return { dataProduct, typeValue, dataSkus }
    }

    //*********************** - CHECK - ***********************//

    //DISCOUNT
    const fetchDiscount = async (subtotal : number) => {
        try {
            const dataDis = await $fetch<{ error: number; data: Discount; message: string }>(`${apiUrl}discounts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    subtotal,
                }
            })

            const dis = dataDis.data;

            if (dis?.discountBasedOn === 'percent') {
                discountValue.value = (dis.discountValue / 100) * subTotal.value
            } else if (dis?.discountBasedOn === 'value') {
                discountValue.value = dis.discountValue
            } else {
                discountValue.value = 0
            }

            return discountValue;

        } catch (err) {
            error.value = 1
            console.error("Error fetching discounts:", err)
        }
    }

    //PROMOTIONS
    const fetchPromotion = async (skuId: number) => {
        try {
            const promotionRes = await $fetch<{ error: number; data: Promotion ; message: string }>(`${apiUrl}promotions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    skuId : skuId,
                }
            })

            if(promotionRes.data) {
                const index = listPromotion.value.findIndex(p => p.skuIdIn === skuId);
                if (index !== -1) {                    
                    listPromotion.value[index] = promotionRes.data;
                } else {                    
                    listPromotion.value.push(promotionRes.data);
                }
            }

            console.log(listPromotion.value)
            return listPromotion;

        } catch (err) {
            error.value = 1
            console.error("Error fetching discounts:", err)
        }
    }

    // VARIANT-OPTIONS
    const fetchVariant = async (idSku : number) => {
        try {
            const data = await $fetch<{ error: number; data: { name: string }[] }>(`${apiUrl}skus/${idSku}/variant-options`)
            dataVariant.value = data?.data.map(item => item.name) || [];
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
        } catch (err) {
            error.value = 1
            console.error("Error fetching weights:", err)
        }
    }

    // ******************** // ******************** // ********************  UI  ******************** // ******************** // ******************** //

    // Khi store khởi tạo → load cart từ localStorage
    const loadCartFromStorage = () => {
        const raw = localStorage.getItem('cart_data')
        addCartItems.value = raw ? JSON.parse(raw) : []
    }

    // Khi reload → xoá BuyNow (vì chỉ dùng 1 lần)
    const clearBuyNowOnReload = () => {
        buyNowItem.value = null
        sessionStorage.removeItem('checkout_data')
    }

    //remove product cart
    const removeItem = (index: number) => {
        if (buyNowItem.value) {
            buyNowItem.value = null
            sessionStorage.removeItem('checkout_data');
        } else {
            addCartItems.value.splice(index, 1)
            addDataCartToServer();
        }
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
                target.qtyProductOfPromotion++;
                
            }
            
        }
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
                target.qtyProductOfPromotion--;
            }
        }
        addDataCartToServer();
    }

    const checkPromotion = async (idSku : number, quantity : number) => {       
        const promotion = listPromotion.value.find(p => p.skuIdIn === idSku);

        if (!promotion) {
            console.log("❌ Không tìm thấy promotion cho skuId:", idSku);
            return;
        }

        if (quantity >= Number(promotion.quantityIn || 0)) {
            const target = addCartItems.value.find(item => item.skuId === idSku);
            if (target) {
                target.namePromotion = promotion.skuNameIn || "";
                target.qtyProductOfPromotion = promotion.quantityOutMax || 0;
            }
            console.log("✅ Promotion applied:", promotion);
        } else {
            // Nếu chưa đủ điều kiện thì reset
            const target = addCartItems.value.find(item => item.skuId === idSku);
            if (target) {
                target.namePromotion = "";
                target.qtyProductOfPromotion = 0;
            }
            console.log("ℹ️ Chưa đạt số lượng để hưởng promotion");
        }

        return promotion;
    }

    // Lưu cartPro vào localStorage khi thay đổi
    watch(addCartItems, async (val)=> {
        localStorage.setItem('cart_data', JSON.stringify(val));       
    }, { deep: true })

    // Check discounts
    watch(subTotal, (newSubtotal) => {
        if (newSubtotal > 0) {
            fetchDiscount(newSubtotal)
        } else {
            dataDiscount.value = null
        }
    });

    return {
    // state
    addCartItems,
    buyNowItem,
    dataWeight,

    // getters
    cartCount,
    dataShow,
    subTotal,
    weightsTotal,
    shippingFee,
    orderTotal,
    discountValue,
    dataPromotion,

    // actions
    fetchDataCart,
    fetchWeights,
    fetchDiscount,
    fetchPromotion,
    getDataBuyNow,
    dataCartBuyNow,
    getDataAddCart,
    loadCartFromStorage,
    clearBuyNowOnReload,
    removeItem,
    increment,
    decrement,
  }
  
});