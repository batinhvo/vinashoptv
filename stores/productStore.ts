interface Products {
    id: number;
    useTax: string;
    tax: string;
    status: string;
    categoryId: number;
    venderId: number;
    isBestSeller: string;
    isSpecial: string;
    minPrice: number;
    total: number;
    totalOut: number;
    totalOutFake: number;
    media: string;
    title: string;
    slug: string;
    summary: string;
    content: string;
    howToUse: string;
}

export const useProductStore = defineStore('products', () => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiBaseUrl;

    const products = ref<Products[]>([]);
    const error = ref<number>(0); // Lưu trạng thái lỗi, 0 là không có lỗi.

    const fetchProducts =  async () => {
        if (products.value.length > 0) return;

        try {
            const {data: proData, error: proError} = await useAsyncData(
                'products',
                () => $fetch<{ error: number; data:{list: Products[]; count: number}; message: string }>(`${apiUrl}products?categoryId=41&descending=1&page=1&perPage=8&sortBy=createdAt`)
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

    return { products, fetchProducts, error };
});