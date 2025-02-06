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
    summary: string;
    content: string;
    howToUse: string;
}

export const useProductStore = defineStore('products', () => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiBaseUrl;

    const products = ref<Products[]>([]);
    const error = ref<number>(0); // Lưu trạng thái lỗi, 0 là không có lỗi.
    const message = ref<string>(''); 
    const loading = ref<boolean>(false); // Trạng thái đang tải

    const fetchProducts =  async () => {
        loading.value = true; // Bắt đầu tải
        try {
            const data = await $fetch<{ error: number; data:{list: Products[]; count: number}; message: string }>('https://vinashoptv.com/api/v1/products?categoryId=41&descending=1&page=1&perPage=8&sortBy=createdAt');      
            console.log(data.data.list)
            if ( data.error === 0 ) {
                products.value = data.data.list;
                message.value = data.message || 'Không có thông báo';                          
            } else {
                error.value = 1;
                message.value = data.message || 'Có lỗi xảy ra từ phía máy chủ';
            }

        } catch (err: any) {
            error.value = 1;
            message.value = err.message || 'Lỗi khi kết nối tới máy chủ';
        } finally {
            loading.value = false; // Kết thúc tải
        }
    };

    return { products, fetchProducts, error, message, loading };
});