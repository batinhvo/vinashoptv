export const useImagesProduct = defineStore('imagesProduct', () => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiBaseUrl;

    const dataImg = ref<string>('');
    const error = ref<number>(0); // Lưu trạng thái lỗi, 0 là không có lỗi.
    const message = ref<string>(''); 
    const loading = ref<boolean>(false); // Trạng thái đang tải

    const fetchImagesProduct =  async (imgName: string) => {
        loading.value = true; // Bắt đầu tải
        try {
            const data = await $fetch<{ error: number; data: string ; message: string }>(`${apiUrl}image?path=${imgName}`);      
            if ( data.error === 0 && data.data ) {        
                dataImg.value = data.data;       
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

    return { dataImg, fetchImagesProduct, error, message, loading };

    
});