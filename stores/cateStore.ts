import { type Category } from "types/categoryTypes";

export const useCateStore = defineStore('categories', () => {

    const config = useRuntimeConfig();
    //const apiUrl = config.public.apiBaseUrl;

    const apiUrl = import.meta.browser
    ? config.public.apiBaseServer
    : config.public.apiBaseUrl

    console.log(apiUrl)

    const categories = ref<Category[]>([]);
    const flatCategories  = ref<Category[]>([]);
    const error = ref<number>(0); // Lưu trạng thái lỗi, 0 là không có lỗi.
    const loaded = ref(false);

    const buildCategoryTree = (list: Category[]): Category[] => {
        const map = new Map<number, Category & { children: Category[] }>()
        const roots: Category[] = []

        // Tạo map
        for (const c of list) {
            map.set(c.id, { ...c, children: [] })
        }

        // Gắn con vào cha
        for (const c of list) {
            if (c.parentId === 0) roots.push(map.get(c.id)!)
            else map.get(c.parentId)?.children.push(map.get(c.id)!)
        }

        // Hàm đệ quy sắp xếp
        const sortTree = (nodes: Category[]): Category[] =>
            [...nodes]
            .sort((a, b) => a.sort - b.sort)
            .map((n) => ({
            ...n,
            children: n.children?.length ? sortTree(n.children) : [],
        }))

        return sortTree(roots)
    }

    const fetchCategories =  async (force = false): Promise<void> => {
        if (loaded.value && categories.value.length && !force) return;// nếu dữ liệu đã có thì không gọi lại

        try {
            const { data: cateData, error: fetchError } = await useAsyncData(
                'categories', // Tên key duy nhất
                () => $fetch<{ error: number; data: Category[]; message: string }>(`${apiUrl}categories`)
            );

            if(fetchError.value) {
                error.value = 1; // Có lỗi xảy ra
                console.error('Error fetching categories:', fetchError.value);
                return;
            }

            const res = cateData.value
            if (!res?.data) throw new Error('Dữ liệu trả về không hợp lệ')

            flatCategories.value = res.data;
            categories.value = buildCategoryTree(res.data)
            loaded.value = true
            error.value = 0; // Reset lỗi khi fetch thành công

        } catch (e) {
            error.value = 1; // Gán lỗi khi xảy ra exception
            console.error('Exception in fetchCate:', e);
        }
    };

    const getCategories = async (): Promise<Category[]> => {
        if (!loaded.value) await fetchCategories()
        return categories.value
    }
    
    // const rootCategories = computed(() =>
    //     categories.value.filter((c) => c.parentId === 0)
    // )

    return {
        // state
        categories,
        flatCategories,
        error,
        loaded,

        // actions
        fetchCategories,
        getCategories,

        // getters
        //rootCategories,
    }

});



// Dùng Pinia store khi bạn cần:
// Quản lý dữ liệu global và chia sẻ dữ liệu giữa nhiều component.
// Lưu trữ dữ liệu dài hạn mà không cần fetch lại trong mỗi page.

// Dùng useAsyncData khi:
// Fetch dữ liệu cụ thể cho một page/component và không cần chia sẻ nó.