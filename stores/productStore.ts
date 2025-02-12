import { type Products } from "types/productTypes";

export const useProductStore = defineStore('products', () => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiBaseUrl;

    const products = ref<Products[]>([]);
    const error = ref<number>(0); // Lưu trạng thái lỗi, 0 là không có lỗi.

    const fetchProducts =  async (params: any) => {
        try {
            const queryString = new URLSearchParams(params.value).toString();

            const {data: proData, error: proError} = await useAsyncData(
                'products',
                () => $fetch<{ error: number; data:{list: Products[]; count: number}; message: string }>(`${apiUrl}products?${queryString}`)
            );

            if(proError.value) {
                error.value = 1; // Có lỗi xảy ra
                console.error('Error fetching categories:', proError.value);
                return;
            }

            products.value = proData.value?.data.list || [];
            error.value = 0; // Không có lỗi

        } catch (e) {
            error.value = 1;
            console.error('Exception in fetchProducts:', e);
        } 
    };

    return { products, fetchProducts };
});