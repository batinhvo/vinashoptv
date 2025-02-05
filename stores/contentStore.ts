interface Content {
    id: number;
    title: string;
    content: string;
}

export const useContent = defineStore('contents', () => {
    const contents = ref<Content[]>([]);
    const error = ref<number>(0); // Lưu trạng thái lỗi, 0 là không có lỗi.
    const message = ref<string>(''); 
    const loading = ref<boolean>(false); // Trạng thái đang tải

    const fetchContent =  async () => {
        loading.value = true; // Bắt đầu tải
        try {
            const data = await $fetch<{ error: number; data: Content | null; message: string }>('https://vinashoptv.com/api/v1/articles/about-us');      

            if ( data.error === 0 && data.data ) {
                contents.value = [data.data];
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

    return { contents, fetchContent, error, message, loading };
});