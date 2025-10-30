interface Content {
    id: number;
    title: string;
    content: string;
}

export const useContentStore = defineStore('content', () => {
    const apiUrl = useApi();

    const content = ref<Content | null>(null);
    const error = ref<number>(0); // Lưu trạng thái lỗi, 0 là không có lỗi.
    const message = ref<string>(''); 
    const loading = ref<boolean>(false); // Trạng thái đang tải

    const fetchContent =  async (article: string):Promise<void> => {
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

    return { content, fetchContent, loading };
});

/*Promise<void> nghĩa là hàm này không trả về giá trị cụ thể nào (kiểu void), nhưng nó vẫn trả về một Promise để biểu thị rằng hành động bất đồng bộ đã hoàn thành (hoặc bị lỗi). */