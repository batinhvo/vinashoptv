import type { CartItem, Weights } from "types/orderTypes";
const notify = useNotify();


export const useCartStore = defineStore('cart', () => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiBaseUrl;
    const error = ref<number>(0); 

    // state
    const addCartItems = ref<CartItem[]>([])
    const buyNowItem = ref<CartItem | null>(null)
    const dataWeights = ref<Weights[]>([])

    const productStore = useProductStore()

    //****************************** GET ******************************//

    const cartCount = computed(() => addCartItems.value.length)

    const dataShow = computed<CartItem[]>(() => {
        return buyNowItem.value ? [buyNowItem.value] : addCartItems.value
    })

    const cartTotal = computed(() => {
        return dataShow.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
    })

    const weightsTotal = computed(() => {
        return dataShow.value.reduce((sum, item) => sum + item.weight * item.quantity, 0)
    })

    const shippingFee = computed(() => {
        if (!dataWeights.value.length) return 0
        const weight = weightsTotal.value
        const found = dataWeights.value.find(w => weight <= w.zoneTo)

        return found ? found.fee : dataWeights.value.at(-1)?.fee || 0
    })

    const orderTotal = computed(() => {
        return cartTotal.value + shippingFee.value
    })
   


    //******************************************************** ACTIONS ********************************************************//

    // WEIGHTS
    const fetchWeights = async () => {
        try {
            const data = await $fetch<{ error: number; data: Weights[]; message: string }>(`${apiUrl}weights`)
            dataWeights.value = data?.data || []
        } catch (err) {
            error.value = 1
            console.error("Error fetching products:", err)
        }
    }

    // BUY NOW
    const getDataBuyNow = (slugPro: string, idSkus: number, quantity: number) => {       
        buyNowItem.value = null;
        const checkoutData = { slugPro, idSkus, quantity }
        sessionStorage.setItem('checkout_data', JSON.stringify(checkoutData))
        notify({ message: 'Buy now item added!', type: 'success', time: 3000 })
    }

    // FETCH PRODUCTS
    const loadCheckoutData = async () => {
        const raw = sessionStorage.getItem('checkout_data')
        const checkoutData = raw ? JSON.parse(raw) : null
        if (!checkoutData || !checkoutData.slugPro) return

        const { slugPro, idSkus, quantity = 1 } = checkoutData
        await productStore.fetchProductDetails(slugPro)
        const dataDetails = productStore.productDetails
       
        if (dataDetails) {
            buyNowItem.value = {
                title: dataDetails.title,
                price: dataDetails.minPrice,
                type: dataDetails.variants.map(item => item.options.find(opt => opt.id === idSkus)?.name).join(', '),
                quantity,
                weight: Number(dataDetails.skus.map(k => k.weight)),
            }
        }
    }

    // ADD TO CART
    const getDataAddCart = async (slugPro: string, idSkus:number, quantity: number) => {
        await productStore.fetchProductDetails(slugPro)
        const details = productStore.productDetails;
        if(!details) return;

        const typeName = details.variants.map(item => item.options.find(opt => opt.id === idSkus)?.name).join(', ')
        const existing = addCartItems.value.find(item => item.title === details.title && item.type === typeName)
        
        if(existing) {
            existing.quantity += quantity
        } else {
            addCartItems.value.push({
                title: details.title,
                type: typeName,
                price: details.minPrice,
                quantity,
                weight: Number(details.skus.map(k => k.weight)),
            })

        }

        notify({ message: 'Added to cart!', type: 'success', time: 3000 })
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
    watch(addCartItems, (val) => {
        localStorage.setItem('cart_data', JSON.stringify(val))
    }, { deep: true })

    return {
    // state
    addCartItems,
    buyNowItem,
    dataWeights,

    // getters
    cartCount,
    dataShow,
    cartTotal,
    weightsTotal,
    shippingFee,
    orderTotal,

    // actions
    fetchWeights,
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