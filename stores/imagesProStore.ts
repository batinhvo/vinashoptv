import type { subImgData } from "types/productTypes";

export const useImagesProduct = defineStore('imagesProduct', () => {

    const apiUrl = useApi();

    const dataImgCache = ref<{ [key: string]: string }>({}); // Cache hình ảnh theo imgName
    const subDataImg = ref<subImgData[]>([]);

    const fetchImagesProduct =  async (imgName: string):Promise<string | undefined> => {

        if (!imgName) return "/images/default-images.jpg"; // Ảnh mặc định nếu không có tên ảnh

        if (dataImgCache.value[imgName])  return dataImgCache.value[imgName];
        
        try {
            const dataImg = await $fetch<{ error: number; data: string; message: string }>(
                `${apiUrl}image?path=${imgName}`
            );

            if (dataImg.error !== 0) {
                console.error('Error fetching image product:', dataImg.message);
                return "/images/default-images.jpg";
            }

            dataImgCache.value[imgName] = dataImg.data;
            return dataImg.data;

        } catch(e) {
            console.error('Exception in fetch image product:', e);
            return "/images/default-images.jpg";
        }
    };

    const fetchSubImagesProduct = async (idPro : number):Promise<subImgData[] | undefined> => {

        if (!idPro) return undefined;
        try {
            const subImage = await $fetch<{ error: number; data: subImgData[] }>(
                `${apiUrl}media?ownerId=${idPro}&ownerType=product`
            );

            if (subImage.error !== 0) {
                console.error('Error fetching sub image product');
                return undefined;
            }

            subDataImg.value = subImage.data;          

        } catch(e) {
            console.error('Exception in fetch sub image product:', e);
            return undefined;
        }
    }

    return { fetchImagesProduct, fetchSubImagesProduct, subDataImg};
});


/*

Mặc dù useAsyncData đã có cơ chế cache dữ liệu, nhưng việc tạo thêm dataImgCache giúp tối ưu việc sử dụng bộ nhớ và giảm số lần gọi API. 
dataImgCache cung cấp cơ chế lưu trữ riêng cho hình ảnh, giúp tái sử dụng hình ảnh đã tải mà không cần gọi lại API, ngay cả khi người dùng 
truy cập vào trang mới. Điều này đặc biệt hữu ích khi muốn duy trì dữ liệu trong bộ nhớ lâu dài, giúp tiết kiệm tài nguyên và cải thiện hiệu suất.

useAsyncData thường được dùng để tải dữ liệu khi component được khởi tạo hoặc khi có sự thay đổi của tham số, và dữ liệu đó có thể được xem là tạm thời.
Trong khi đó, dataImgCache được dùng để lưu trữ kết quả đã tải, đảm bảo rằng các dữ liệu hình ảnh đã được lấy từ API sẽ tồn tại cho đến khi bạn quyết định xóa hay cập nhật cache đó.

*/