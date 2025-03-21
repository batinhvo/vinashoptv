import type {  ProductDetails, Products } from "types/productTypes";

export const useProductStore = defineStore('products', () => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiBaseUrl;

    const products = ref<Products[]>([]);
    const productDetails = ref<ProductDetails | null>(null);
    const error = ref<number>(0); // Lưu trạng thái lỗi, 0 là không có lỗi.
    const productTotal = ref<number>(0);

    const fetchProducts =  async (params: any):Promise<void> => {
        try {
        
            const queryString = new URLSearchParams(params.value).toString();

            const data = await $fetch<{ error: number; data:{list: Products[]; count: number}; message: string }>(`${apiUrl}products?${queryString}`)

            if(data.error) {
                error.value = 1; // Có lỗi xảy ra
                console.error('Error fetching products:', error.value);
                return;
            }

            products.value = data.data.list || [];
            productTotal.value = data.data.count || 0;
            error.value = 0; // Không có lỗi

        } catch (e) {
            error.value = 1;
            console.error('Exception in fetchProducts:', e);
        } 
    };

    const fetchProductDetails =  async (slug: string):Promise<string | undefined> => {
        try {
            if(slug) {
                const data = await $fetch<{ error: number; data: ProductDetails; message: string }>(`${apiUrl}products/${slug}`)
                if(data.error) {
                    error.value = 1; // Có lỗi xảy ra
                    console.error('Error fetching product details:', error.value);
                    return;
                }
    
                productDetails.value = data.data || '';
                error.value = 0; // Không có lỗi
            }
        } catch (e) {
            error.value = 1;
        } 
    };

    return { products, fetchProducts, productTotal, fetchProductDetails, productDetails };
});