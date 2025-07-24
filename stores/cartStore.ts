import type {  ProductDetails, Products } from "types/productTypes";
const notify = useNotify();

interface CartItem {
    title: string
    type?: string 
    price: number
    quantity: number
}

export const useCartStore = defineStore('cart', () => {

    const cartPro = ref<CartItem[]>([])
    const dataProCart = ref<CartItem | null>(null)

    const productStore = useProductStore()

    // Tổng số lượng sản phẩm trong giỏ
    const cartCount = computed(() =>
        cartPro.value.reduce((total, item) => total + item.quantity, 0)
    );

    // Clean cart
    const clearBuyNowData = () => {
        sessionStorage.removeItem('checkout_data');
    }

    // -------------------------BUY NOW------------------------ //
    const getDataBuyNow = (slugPro: string, idSkus: number, quantity: number) => {
        // const checkoutData = { slugPro, idSkus, quantity }
        // sessionStorage.setItem('checkout_data', JSON.stringify(checkoutData))
        // notify({ message: 'Added to cart!', type: 'success', time: 3000 })

        // Xóa giỏ hàng hiện tại
        cartPro.value = []

        // Xóa cả dataProCart cũ (nếu cần)
        dataProCart.value = null

        // Ghi lại dữ liệu mới vào sessionStorage
        const checkoutData = { slugPro, idSkus, quantity }
        sessionStorage.setItem('checkout_data', JSON.stringify(checkoutData))

        notify({ message: 'Added to cart!', type: 'success', time: 3000 })
    }

    // Fetch sản phẩm từ slug + thêm vào giỏ hàng
    const loadCheckoutData = async () => {
        const raw = sessionStorage.getItem('checkout_data')

        console.log(raw)

        const checkoutData = raw ? JSON.parse(raw) : null

        if (!checkoutData || !checkoutData.slugPro) return

        const slugPro = String(checkoutData.slugPro)
        const quantity = checkoutData.quantity ?? 1

        await productStore.fetchProductDetails(slugPro)
        const dataDetails = productStore.productDetails

        if (dataDetails) {
            dataProCart.value = {
                title: dataDetails.title,
                price: dataDetails.minPrice,
                type: dataDetails.variants.map(item => item.options.find(opt => opt.id === checkoutData.idSkus)?.name).join(', '),
                quantity,
            }

            const alreadyInCart = cartPro.value.some(
                item => item.title === dataProCart.value?.title
            )

            if (!alreadyInCart && dataProCart.value) {
                cartPro.value.push({ ...dataProCart.value })
            }
        }
    }

    // -----------------------ADD TO CART------------------------------ //
    const getDataAddCart = async (slugPro: string, idSkus:number, quantity: number) => {
        await productStore.fetchProductDetails(slugPro)
        const details = productStore.productDetails;

        if(!details) return;

        const existing = cartPro.value.find(item => item.title === details.title)

        if(existing) {
            existing.quantity += quantity;
        } else {
            cartPro.value.push({
                title: details.title,
                type: details.variants.map(item => item.options.find(opt => opt.id === idSkus)?.name).join(', '),
                price: details.minPrice,
                quantity,
            });
        }

        notify({ message: 'Added to cart!', type: 'success', time: 3000 })
    }

    return {
        cartPro,
        cartCount,
        dataProCart,     
        getDataBuyNow, 
        getDataAddCart,
        loadCheckoutData,
    }
  
});