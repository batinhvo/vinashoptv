export const useImagesProduct = defineStore('imagesProduct', () => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiBaseUrl;

    const dataImgCache = ref<{ [key: string]: string }>({}); // Cache hình ảnh theo imgName
    const error = ref<number>(0); // Lưu trạng thái lỗi, 0 là không có lỗi.

    const fetchImagesProduct =  async (imgName: string) => {

        if (dataImgCache.value[imgName]) {
            return dataImgCache.value[imgName];
        }

        try {
            const { data, error: fetchImageError } = await useAsyncData(
                `fetch-image-${imgName}`,
                () => $fetch<{ error: number; data: string; message: string }>(`${apiUrl}image?path=${imgName}`)
            );

            if (fetchImageError.value) {
                error.value = 1;
                console.error('Error fetching image product:', fetchImageError.value);
            } 

            dataImgCache.value[imgName] = data.value?.data || '';
            error.value = 0;

            return dataImgCache.value[imgName];
        } catch(e) {
            error.value = 1; // Gán lỗi khi xảy ra exception
            console.error('Exception in fetch image product:', e);
        }
    };

    return { dataImgCache, fetchImagesProduct, error };
});