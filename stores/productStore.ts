import type {  ProductDetail, Product, skusProduct } from "types/productTypes";

export const useProductStore = defineStore('products', () => {
    const apiUrl = useApi();

    const productList = ref<Product[]>([]);
    const product = ref<Product | null>(null);
    const productDetail = ref<ProductDetail | null>(null);
    const productDetailSkus = ref<skusProduct | null>(null);
    const error = ref<number>(0); // Lưu trạng thái lỗi, 0 là không có lỗi.
    const productTotal = ref<number>(0);

    const fetchProducts =  async (params: any):Promise<void> => {
        try {
        
            const queryString = new URLSearchParams(params.value).toString();

            const data = await $fetch<{ error: number; data:{list: Product[]; count: number}; message: string }>(`${apiUrl}products?${queryString}`)

            if(data.error) {
                error.value = 1; // Có lỗi xảy ra
                console.error('Error fetching products:', error.value);
                return;
            }

            productList.value = data.data.list || [];
            productTotal.value = data.data.count || 0;
            error.value = 0; // Không có lỗi

        } catch (e) {
            error.value = 1;
            console.error('Exception in fetchProducts:', e);
        } 
    };

    const fetchProductDetails =  async (slug : string):Promise<string | undefined> => {
        try {
            if(slug) {
                const data = await $fetch<{ error: number; data: ProductDetail; message: string }>(`${apiUrl}products/${slug}`)
                if(data.error) {
                    error.value = 1; // Có lỗi xảy ra
                    console.error('Error fetching product details:', error.value);
                    return;
                }
    
                productDetail.value = data.data || '';
                error.value = 0; // Không có lỗi
            }
        } catch (e) {
            error.value = 1;
        } 
    };

    const fetchProductWithId =  async (idPro : number):Promise<string | undefined> => {
        try {
            if(idPro) {
                const data = await $fetch<{ error: number; data: Product; message: string }>(`${apiUrl}products/${idPro}`)
                if(data.error) {
                    error.value = 1; // Có lỗi xảy ra
                    console.error('Error fetching product:', error.value);
                    return;
                }
    
                product.value = data.data || '';
                error.value = 0; // Không có lỗi
            }
        } catch (e) {
            error.value = 1;
        } 
    };

    const fetchProductDetailSkus =  async (skuId: number):Promise<string | undefined> => {
        try {
            if(skuId) {
                const data = await $fetch<{ error: number; data: skusProduct; message: string }>(`${apiUrl}skus/${skuId}`)
                if(data.error) {
                    error.value = 1; // Có lỗi xảy ra
                    console.error('Error fetching product details:', error.value);
                    return;
                }
    
                productDetailSkus.value = data.data || '';
                error.value = 0; // Không có lỗi
            }
        } catch (e) {
            error.value = 1;
        } 
    };

    return { productList, fetchProducts, productTotal, fetchProductDetails, productDetail, product, fetchProductDetailSkus, productDetailSkus, fetchProductWithId};
});