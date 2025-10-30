<template>
    <div v-if="isLoading" class="fixed inset-0 bg-white/80 flex flex-col items-center justify-center z-50"> 
        <div class="flex space-x-2">
            <span class="w-3 h-3 bg-green-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span class="w-3 h-3 bg-green-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span class="w-3 h-3 bg-green-600 rounded-full animate-bounce"></span>
        </div>
        <p class="mt-4 text-gray-700 font-medium text-lg">Loading</p>
    </div>

    <div v-else>
        <div>
            <NuxtImg :src="imgBanner" class="w-full" alt="" />
        </div>
        <div class="container mx-auto min-h-[500px]">
            <div class="my-0 md:my-10">
                <ul class="flex items-center bg-zinc-100 md:bg-white pl-2 xl:pl-0">
                    <li class="px-3 py-2 hover:bg-zinc-100 rounded hover:border hover:border-gray-200"><NuxtLink to="/">Home</NuxtLink></li>
                    <li class="px-2"><i class="ec ec-arrow-right-categproes"></i></li>
                    <li class="px-3 py-2 md:bg-zinc-100 hover:bg-gray-200 rounded md:border md:border-gray-100"><NuxtLink to="/bestseller">Best Seller</NuxtLink></li>
                </ul>
            </div>           

            <div class="flex flex-wrap">
                <!-- left -->
                <div class="w-full xl:w-1/5 px-4 hidden xl:block">          
                    <MenuCategoryBody />
                </div>

                <!-- right -->
                <div class="w-full xl:w-4/5 px-4">          
                    <div class="flex justify-between mb-4 mt-4 md:mt-0">
                        <h3 class="text-2xl">Best Seller</h3>
                        <p>Showing {{ fromShow }}-{{ toShow }} of {{ totalProducts }} results</p>
                    </div>
                    <BodyProductSelectSort @updateParams="updateProductsFromSort"/>
                    <BodyProductDisplay :dataProduct="productListData"/>
                    <BodyProductPagination v-if="totalProducts > 20" 
                        :dataTotalPro="totalProducts" 
                        :updateSort="isUpdateSort" 
                        @updatePages="updatePages" 
                        @updateRange="rangeChange" 
                        @resetUpdateSort="isUpdateSort = false"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { type Product } from "types/productTypes";

    const imgBanner = '/images/banner/bg-banner-01.jpg';

    //----------------------------API------------------------------------//

    const productStore = useProductStore();

    const productListData = ref<Product[]>([]);
    const totalProducts = ref(0);
    const isLoading = ref(true);

    const isUpdateSort = ref(false);
    const fromShow = ref(1);
    const toShow = ref(1);

    interface Params {
        bestseller: number,
        descending: number;
        page: number;
        perPage: number;
        sale?: number;
        sortBy: string,
    };

    const params = ref<Params>({
        bestseller: 1,
        descending: 1,
        page: 1,
        perPage: 20,
        sortBy: 'createdAt',
    });

    const fetchDataProductSpecial = async () => {
        try {
            await productStore.fetchProducts(params);

            productListData.value = productStore.productList || [];
            totalProducts.value = productStore.productTotal || 0;

            //Cập nhật range hiển thị (ví dụ 1–20, 21–40)
            // const from = (params.value.page - 1) * params.value.perPage + 1;
            // const to = Math.min(params.value.page * params.value.perPage, totalProducts.value);

            // fromShow.value = from;
            // toShow.value = to;

            setTimeout(() => {
                isLoading.value = false;
            }, 1000);
        } catch (err) {
            console.error("Error fetching best seller products:", err);
        }
    };

    const updateProductsFromSort = async (sortBy: string, descending: number) => {
        isUpdateSort.value = true;

        params.value.sortBy = sortBy;
        params.value.descending = descending;
        params.value.page = 1;

        await fetchDataProductSpecial();
    };

    const updatePages = async (page: number) => {
        params.value.page = page;
        await fetchDataProductSpecial();

        // Cuộn về vị trí phù hợp (client-side)
        if (import.meta.client) {
            const isMobile = window.innerWidth <= 768;
            const scrollTop = isMobile ? 0 : 600;
            window.scrollTo({
            top: scrollTop,
            behavior: "smooth",
            });
        }
    };

    // --- Cập nhật range hiển thị ---
    const rangeChange = ({ from, to }: { from: number; to: number }) => {
        fromShow.value = from;
        toShow.value = to;
    };

    // --- Gọi API sau khi client mount ---
    onMounted(async () => {
        await fetchDataProductSpecial();
    });
    
</script>

