interface Content {
    id: number;
    title: string;
    content: string;
}

export const useContentStore = defineStore('content', () => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiBaseUrl;

    const content = ref<Content | null>(null);
    const error = ref<number>(0); // Lưu trạng thái lỗi, 0 là không có lỗi.
    const message = ref<string>(''); 
    const loading = ref<boolean>(false); // Trạng thái đang tải

    const fetchContent =  async (article: string) => {
        loading.value = true; // Bắt đầu tải
        try {
            const data = await $fetch<{ error: number; data: Content | null; message: string }>(`${apiUrl}/articles/${article}`);      

            if ( data.error === 0 && data.data ) {
                content.value = data.data;
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

    return { content, fetchContent, error, message, loading };
});