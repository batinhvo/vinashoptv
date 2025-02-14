import { type ProductDetails } from "types/productDetailTypes";

export const useProductDetailStore = defineStore('productDetails', () => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiBaseUrl;

    const productDetails = ref<ProductDetails | null>(null);
    const error = ref<number>(0); // Lưu trạng thái lỗi, 0 là không có lỗi.

    const fetchProductDetails =  async (proName: any):Promise<string | undefined> => {
        try {

            const data = await $fetch<{ error: number; data: ProductDetails; message: string }>(`${apiUrl}products/${proName}`)

            if(data.error) {
                error.value = 1; // Có lỗi xảy ra
                console.error('Error fetching product details:', error.value);
                return;
            }

            productDetails.value = data.data || '';
            error.value = 0; // Không có lỗi

        } catch (e) {
            error.value = 1;
            console.error('Exception in fetchProducts:', e);
        } 
    };

    return { productDetails, fetchProductDetails };
});