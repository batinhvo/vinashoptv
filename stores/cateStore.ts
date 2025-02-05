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

    const categories = ref<Category[]>([]);
    const error = ref<number>(0); // Lưu trạng thái lỗi, 0 là không có lỗi.
    const message = ref<string>(''); 

    const fetchCate =  async () => {
        try {
            const data = await $fetch<{ error: number; data: Category[]; message: string }>('https://vinashoptv.com/api/v1/categories');      
            if (data) {
                categories.value = data.data || [];
                message.value = data.message || 'Không có thông báo';                          
            }
        } catch (err) {
            error.value = 1;
            message.value = 'Lỗi khi tải dữ liệu categories.';
        }
    };

    // Hàm trả về các category có cùng parentId
    const groupCate = computed(() => {
        return categories.value.reduce((acc, category) => {
            if(!acc[category.parentId]) { //kiểm tra xem id đã tồn tại trong mảng chưa
                acc[category.parentId] = []; //khởi tạo mảng rỗng cho id
            }
             // Thêm category vào nhóm
            acc[category.parentId].push(category);
            // Sắp xếp danh mục trong từng nhóm theo sort
            acc[category.parentId].sort((a, b) => a.sort - b.sort);

            return acc;
        }, {} as Record<number, Category[]>);
    });

    // Lấy ra chỉ các mảng tên đã sắp xếp
    const groupedNames = computed(() => {
        const grouped = groupCate.value;
        return Object.fromEntries(
            Object.entries(grouped).map(([parentId, categories]) => [
                parentId,
                categories.map((category) => category.name), // Chỉ lấy name
            ])
        );
    });

    return { categories, error, message, fetchCate, groupCate, groupedNames};
});