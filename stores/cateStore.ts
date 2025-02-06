interface Category {
    id: number;
    quantity: number;
    parentId: number;
    sort: number;
    status: string;
    name: string;
    slug: string;
    media: string;
    summary: string;
}

export const useCateStore = defineStore('categories', () => {

    const config = useRuntimeConfig();
    const apiUrl = config.public.apiBaseUrl;

    const categories = ref<Category[]>([]);
    const error = ref<number>(0); // Lưu trạng thái lỗi, 0 là không có lỗi.
    const message = ref<string>(''); 
    const loading = ref<boolean>(false); // Trạng thái đang tải

    const fetchCate =  async () => {
        loading.value = true; // Bắt đầu tải
        try {
            const data = await $fetch<{ error: number; data: Category[]; message: string }>(`${apiUrl}categories`);      
            if (data.error === 0) {
                categories.value = data.data || [];
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
    
    return { categories, error, message, fetchCate};
});