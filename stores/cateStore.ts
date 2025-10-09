import { type Category } from "types/categoryTypes";

export const useCateStore = defineStore('categories', () => {

    const config = useRuntimeConfig();
    const apiUrl = config.public.apiBaseUrl;

    const categories = ref<Category[]>([]);
    const dataCatePro = ref<Category[]>([]);
    const error = ref<number>(0); // Lưu trạng thái lỗi, 0 là không có lỗi.
    const loaded = ref(false);

    const processCategories = (dataCate: Category[]): Category[] => {
        const parentCate: Category[] = [];
        const categoryMap = new Map<number, Category>(); // Map of category

        // Gán từng danh mục vào Map
        dataCate.forEach((cate) => {
            categoryMap.set(cate.id, {...cate, children: [] });
        });

        //Gán các phần tử con vào đúng cha
        dataCate.forEach((cate) => {
            if (cate.parentId === 0) {
                parentCate.push(categoryMap.get(cate.id)!);
            } else {
                const parent = categoryMap.get(cate.parentId);
                if (parent) {
                    parent.children?.push(categoryMap.get(cate.id)!);
                }
            }
        });

        // Sắp xếp danh mục theo `sort`
        const sortCategories = (categories: Category[]): Category[] => {
            return categories
            .sort((a, b) => a.sort - b.sort)
            .map((cate) => ({
                ...cate,
                children: cate.children ? sortCategories(cate.children) : [],
            }));
        };

        return sortCategories(parentCate);
    }

    const fetchCategories =  async ():Promise<void> => {
        if (loaded.value && categories.value.length > 0) return;// nếu dữ liệu đã có thì không gọi lại

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

            dataCatePro.value = cateData.value?.data || [];
            categories.value = processCategories(dataCatePro.value);
            loaded.value = true;
            error.value = 0; // Không có lỗi

        } catch (e) {
            error.value = 1; // Gán lỗi khi xảy ra exception
            console.error('Exception in fetchCate:', e);
        }
    };

    const getCategories = async (): Promise<Category[]> => {
        if (!loaded.value) await fetchCategories();
        return categories.value;
    };
    
    return {
        categories,
        dataCatePro,
        error,
        fetchCategories,
        getCategories,
    };
});



// Dùng Pinia store khi bạn cần:
// Quản lý dữ liệu global và chia sẻ dữ liệu giữa nhiều component.
// Lưu trữ dữ liệu dài hạn mà không cần fetch lại trong mỗi page.

// Dùng useAsyncData khi:
// Fetch dữ liệu cụ thể cho một page/component và không cần chia sẻ nó.