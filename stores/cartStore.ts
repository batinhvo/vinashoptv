import type { CartItem, Weights } from "types/orderTypes";
const notify = useNotify();


export const useCartStore = defineStore('cart', () => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiBaseUrl;
    const error = ref<number>(0); // Lưu trạng thái lỗi, 0 là không có lỗi.

    const addCartItems = ref<CartItem[]>([])
    const buyNowItem = ref<CartItem | null>(null)
    const dataWeights = ref<Weights[]>([])

    const productStore = useProductStore()

    // Tổng số lượng sản phẩm trong giỏ
    const cartCount = computed(() => addCartItems.value.length)

    //**************************** GET *********************************//

    const fetchWeights =  async () => {
        try {
            const data = await $fetch<{ error: number; data: Weights[]; message: string }>(`${apiUrl}weights`);
            if (data) {
                dataWeights.value = data.data || [];              
            }
        } catch (err) {
            error.value = 1;
            console.error('Error fetching products:', err);
        }
    };


    //**************************************** BUY NOW - ADD CART *******************************************//

    // -------------------------BUY NOW------------------------ //
    const getDataBuyNow = (slugPro: string, idSkus: number, quantity: number) => {       
        buyNowItem.value = null;

        const checkoutData = { slugPro, idSkus, quantity }
        sessionStorage.setItem('checkout_data', JSON.stringify(checkoutData))

        notify({ message: 'Buy now item added!', type: 'success', time: 3000 })
    }

    // Fetch sản phẩm từ slug + thêm vào giỏ hàng
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

    // -----------------------ADD TO CART------------------------------ //
    const getDataAddCart = async (slugPro: string, idSkus:number, quantity: number) => {
        await productStore.fetchProductDetails(slugPro)
        const details = productStore.productDetails;

        if(!details) return;

        const existing = addCartItems.value.find(item => item.title === details.title)

        if(existing) {
            existing.quantity += quantity;
        } else {
            addCartItems.value.push({
                title: details.title,
                type: details.variants.map(item => item.options.find(opt => opt.id === idSkus)?.name).join(', '),
                price: details.minPrice,
                quantity,
                weight: Number(details.skus.map(k => k.weight)),
            });
        }

        notify({ message: 'Added to cart!', type: 'success', time: 3000 })
    }


    // ******************** // ********************  UI  ******************** // ********************

    //show screen
    const dataShow = computed<CartItem[]>(() => {
        if (buyNowItem.value) {
            return [buyNowItem.value]
        }
            return addCartItems.value
    })

    // Lưu cartPro vào localStorage khi thay đổi
    watch(addCartItems, (val) => {
        localStorage.setItem('cart_data', JSON.stringify(val))
    }, { deep: true })

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

    // Tổng giá trị giỏ hàng / checkout
    const cartTotal = computed(() => {
        return dataShow.value.reduce((sum, item) => {
            return sum + item.price * item.quantity
        }, 0)
    })

    return {
        addCartItems,
        cartCount,
        buyNowItem,  
        dataShow,
        cartTotal,
        dataWeights,
        getDataBuyNow,
        getDataAddCart,
        loadCheckoutData,
        increment,
        decrement,
        removeItem,
        loadCartFromStorage,
        clearBuyNowOnReload,
        fetchWeights   
    }
  
});