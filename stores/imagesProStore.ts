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


/*

Mặc dù useAsyncData đã có cơ chế cache dữ liệu, nhưng việc tạo thêm dataImgCache giúp tối ưu việc sử dụng bộ nhớ và giảm số lần gọi API. 
dataImgCache cung cấp cơ chế lưu trữ riêng cho hình ảnh, giúp tái sử dụng hình ảnh đã tải mà không cần gọi lại API, ngay cả khi người dùng 
truy cập vào trang mới. Điều này đặc biệt hữu ích khi muốn duy trì dữ liệu trong bộ nhớ lâu dài, giúp tiết kiệm tài nguyên và cải thiện hiệu suất.

useAsyncData thường được dùng để tải dữ liệu khi component được khởi tạo hoặc khi có sự thay đổi của tham số, và dữ liệu đó có thể được xem là tạm thời.
Trong khi đó, dataImgCache được dùng để lưu trữ kết quả đã tải, đảm bảo rằng các dữ liệu hình ảnh đã được lấy từ API sẽ tồn tại cho đến khi bạn quyết định xóa hay cập nhật cache đó.

*/