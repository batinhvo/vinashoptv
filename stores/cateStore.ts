interface Categories {
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

export const useCateStore = defineStore('Categories', () => {

    const Categories = ref<Categories[]>([]);
    const error = ref<number>(0); // Lưu trạng thái lỗi, 0 là không có lỗi.
    const message = ref<string>(''); 

    const fetchCate =  async () => {
        try {
            const data = await $fetch<{ error: number; data: Categories[]; message: string }>('https://vinashoptv.com/api/v1/categories');
            if (data) {
                Categories.value = data.data || [];
                message.value = data.message || 'Không có thông báo';
            }
        } catch (err) {
            error.value = 1;
            message.value = 'Lỗi khi tải dữ liệu state.';
        }
    };

    return { Categories, error, message, fetchCate};
});