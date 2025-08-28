import type { CartItem, Discounts, Weights } from "types/orderTypes";
import type { ProductDetail, skusProduct } from "types/productTypes";
const notify = useNotify()

export const useCartStore = defineStore('cart', () => {
    const config = useRuntimeConfig()
    const apiUrl = config.public.apiBaseUrl
    const error = ref<number>(0)

    // state
    const addCartItems = ref<CartItem[]>([])
    const buyNowItem = ref<CartItem | null>(null)
    const dataWeights = ref<Weights[]>([])
    const dataDiscounts = ref<Discounts | null>(null)
    const discountValue = ref<number>(0)
    const isCartCreated = ref(false)
    const dataSkusDetails = ref<skusProduct | null>(null)
    const dataVariant = ref<[]>([])

    const productStore = useProductStore()
    const authStore = useAuthStore()

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
        if (!dataWeights.value.length) return 0
        const weight = weightsTotal.value
        const found = dataWeights.value.find(w => weight <= w.zoneTo)

        return found ? found.fee : dataWeights.value.at(-1)?.fee || 0
    });

    const orderTotal = computed(() => {
        return subTotal.value + shippingFee.value - discountValue.value;
    });
   


    //******************************************************** ACTIONS ********************************************************//

    // GET DATA CART
    const fetchDataCart = async () => {
        const token = useCookie('tokenAccess').value;
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
                    const serverCart = JSON.parse(dataCartResponse.data)

                    //if (Array.isArray(serverCart) && serverCart.length > 0) { //check cart có rỗng không
                        addCartItems.value = [];

                        for (const i of serverCart) {
                            const id = i.skuId;
                            const quantity = i.quantity || 1;

                            await getDataAddCart(id, quantity);                      
                        }
                        
                    //} else {                 
                        
                    //}
                } 
            } catch (err) {
                console.error("Error fetching cart:", err)
            }
        } else {
            const localCart = localStorage.getItem('cart_data')
            addCartItems.value = localCart ? JSON.parse(localCart) : [];
        }
               
        
    }

    // ADD TO CART
    const getDataAddCart = async (idSkus:number, quantity: number) => {

        await productStore.fetchProductDetailSkus(idSkus)
        const dataSkusDetails = productStore.productDetailSkus;

        if(!dataSkusDetails) return;

        const idPro = Number(dataSkusDetails?.productId);
        await productStore.fetchProductWithId(idPro);
        const dataProduct = productStore.product

        if(!dataProduct) return;

        await fetchVariant(idSkus);
        const dataVar = dataVariant.value.join(', ');
        const existing = addCartItems.value.find(item => item.skuId === idSkus && item.type === dataVar)
        
        if(existing) {
            existing.quantity += quantity
        } else {
            addCartItems.value.push({
                skuId: idSkus,
                title: dataProduct.title,
                type: dataVar,
                price: Number(dataSkusDetails?.price) || 0,
                quantity,
                weight: Number(dataSkusDetails?.weight) || 0,
            })
        }

        if (authStore.authenticated && useCookie('tokenAccess').value) {
            addDataCart();
        }

        notify({ message: 'Added to cart!', type: 'success', time: 3000 });
    }

    // BUY NOW
    const getDataBuyNow = (idSkus: number, quantity: number) => {       
        buyNowItem.value = null;
        const checkoutData = { idSkus, quantity }

        console.log("1 " + idSkus)
        sessionStorage.setItem('checkout_data', JSON.stringify(checkoutData))
        notify({ message: 'Buy now item added!', type: 'success', time: 3000 })
    }

    // LOAD PRODUCTS CHECKOUT
    const loadCheckoutData = async () => {
        const raw = sessionStorage.getItem('checkout_data');
        const checkoutData = raw ? JSON.parse(raw) : null;
        if (!checkoutData) return

        const { idSkus, quantity = 1 } = checkoutData;

        console.log(checkoutData)

        await productStore.fetchProductDetailSkus(idSkus);
        const dataSkus = productStore.productDetailSkus;

        const idPro = dataSkus?.id;        
        if (idPro) await productStore.fetchProducts(idPro);
        const dataProduct = productStore.product;

        await fetchVariant(idSkus);
       
        if (dataProduct) {
            buyNowItem.value = {
                skuId: Number(dataSkus?.id),
                title: dataProduct.title,
                price: Number(dataSkus?.price) || 0,
                type: dataVariant.value.join(', '),
                quantity,
                weight: Number(dataSkus?.weight) || 0,
            }
        }
    }

    //POST DATA CART
    const addDataCart = async () => {
        const token = useCookie('tokenAccess').value;
        if (!authStore.authenticated || !token) return;

        const skuIdList = addCartItems.value.map(item => ({
            skuId: item.skuId,
            quantity: item.quantity
        }))
        
        try {
            
            if (addCartItems.value.length === 1) {
                // Nếu giỏ hàng rỗng -> POST
                await $fetch<{ error: number; data: any }>(`${apiUrl}carts`, {
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

    //DISCOUNT
    const fetchDiscounts = async (subtotal : number) => {
        try {
            const dataDis = await $fetch<{ error: number; data: Discounts; message: string }>(`${apiUrl}discounts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    subtotal,
                }
            })

            const dis = dataDis.data

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

    // VARIANT-OPTIONS
    const fetchVariant = async (idSkus : number) => {
        try {
            const data = await $fetch<{ error: number; data:[] }>(`${apiUrl}skus/${idSkus}/variant-options`)
            dataVariant.value = data?.data || []

            return dataVariant;
        } catch (err) {
            error.value = 1
            console.error("Error fetching variant options:", err)
        }
    }

    // WEIGHTS
    const fetchWeights = async () => {
        try {
            const data = await $fetch<{ error: number; data: Weights[]; message: string }>(`${apiUrl}weights`)
            dataWeights.value = data?.data || []
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
        if (buyNowItem.value && dataShow.value.length === 1) {
            buyNowItem.value = null
            sessionStorage.removeItem('checkout_data')
        } else {
            addCartItems.value.splice(index, 1)
        }
    }

    // quantity
    const increment = (item: CartItem) => {
        if (buyNowItem.value && buyNowItem.value.title === item.title) {
            // Trường hợp Buy Now
            buyNowItem.value.quantity++
        } else {
            // Trường hợp giỏ hàng
            const target = addCartItems.value.find(p => p.title === item.title && p.type === item.type)
            if (target) target.quantity++
        }
    }

    const decrement = (item: CartItem) => {
        if (buyNowItem.value && buyNowItem.value.title === item.title) {
            if (buyNowItem.value.quantity > 1) {
                buyNowItem.value.quantity--
            }
        } else {
            const target = addCartItems.value.find(p => p.title === item.title && p.type === item.type)
            if (target && target.quantity > 1) {
                target.quantity--
            }
        }
    }

    // Lưu cartPro vào localStorage khi thay đổi
    watch(addCartItems, async (val)=> {
        localStorage.setItem('cart_data', JSON.stringify(val));
        if (authStore.authenticated && useCookie('tokenAccess').value) {
            addDataCart();
        }

    }, { deep: true })

    // Check discounts
    watch(subTotal, (newSubtotal) => {
        if (newSubtotal > 0) {
            fetchDiscounts(newSubtotal)
        } else {
            dataDiscounts.value = null
        }
    })

    return {
    // state
    addCartItems,
    buyNowItem,
    dataWeights,

    // getters
    cartCount,
    dataShow,
    subTotal,
    weightsTotal,
    shippingFee,
    orderTotal,
    discountValue,

    // actions
    fetchDataCart,
    fetchWeights,
    fetchDiscounts,
    getDataBuyNow,
    loadCheckoutData,
    getDataAddCart,
    loadCartFromStorage,
    clearBuyNowOnReload,
    removeItem,
    increment,
    decrement,
  }
  
});