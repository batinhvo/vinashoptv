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

    const fetchCate =  async () => {
        if (categories.value.length > 0) return; // nếu dữ liệu đã có thì không gọi lại

        try {
            const { data: cateData, error: fetchCateError } = await useAsyncData(
                'categories', // Tên key duy nhất
                () => $fetch<{ error: number; data: Category[]; message: string }>(`${apiUrl}categories`)
            );

            if(fetchCateError.value) {
                error.value = 1; // Có lỗi xảy ra
                console.error('Error fetching categories:', fetchCateError.value);
                return;
            }

            categories.value = cateData.value?.data || [];
            error.value = 0; // Không có lỗi

        } catch (e) {
            error.value = 1; // Gán lỗi khi xảy ra exception
            console.error('Exception in fetchCate:', e);
        }
    };
    
    return { categories, error, fetchCate};
});



// Dùng Pinia store khi bạn cần:
// Quản lý dữ liệu global và chia sẻ dữ liệu giữa nhiều component.
// Lưu trữ dữ liệu dài hạn mà không cần fetch lại trong mỗi page.

// Dùng useAsyncData khi:
// Fetch dữ liệu cụ thể cho một page/component và không cần chia sẻ nó.