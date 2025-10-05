<template>
    <div>
        <div>
            <NuxtImg :src="imgBanner" class="w-full" alt="" />
        </div>
        <div class="container mx-auto min-h-[500px]">
            <div class="my-0 md:my-10">
                <ul class="flex items-center bg-zinc-100 md:bg-white pl-2 xl:pl-0">
                    <li class="px-3 py-2 hover:bg-zinc-100 rounded hover:border hover:border-gray-200"><NuxtLink to="/">Home</NuxtLink></li>
                    <li class="px-2"><i class="ec ec-arrow-right-categproes"></i></li>
                    <li class="px-3 py-2 md:bg-zinc-100 hover:bg-gray-200 rounded md:border md:border-gray-100"><NuxtLink to="/saleoff">Sale Off</NuxtLink></li>
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
                        <h3 class="text-2xl">Sale Off</h3>
                        <p>Showing {{ fromShow }}-{{ toShow }} of {{ totalProducts }} results</p>
                    </div>
                    <BodyProductSelectSort @updateParams="updateProductsFromSort"/>
                    <BodyProductDisplay :dataProduct="productListData"/>
                    <BodyProductPagination v-if="totalProducts > 0" 
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
    import { type Params, type Product } from "types/productTypes";

    const imgBanner = '/images/banner/bg-banner-01.jpg';

    //----------------------------API------------------------------------//

    const productStore = useProductStore();

    const productListData = ref<Product[]>([]);
    const totalProducts = ref(0);

    const isUpdateSort = ref(false);
    const fromShow = ref(1);
    const toShow = ref(1);

    const params = ref<Params>({
        descending: 1,
        page: 1,
        perPage: 20,
        sale: 1,
        sortBy: 'createdAt',
    });

    const fetchDataProductSaleOff = async () => {        
        await productStore.fetchProducts(params);
        productListData.value = productStore?.productList || [];
        totalProducts.value = productStore.productTotal || 0;
    }
    
    const updateProductsFromSort = async (sortBy: string, descending: number) => {
        isUpdateSort.value = true;

        params.value.sortBy = sortBy;
        params.value.descending = descending;
        params.value.page = 1;
        fetchDataProductSaleOff();
    };

    const updatePages = async (page: number) => {
        params.value.page = page;
        fetchDataProductSaleOff();

        const isMobile = window.innerWidth <= 768;
        const scrollTop = isMobile ? 0 : 600;

        window.scrollTo({
            top: scrollTop,
            behavior: 'smooth'
        });
    };

    const rangeChange = ({ from, to }: { from: number; to: number }) => {
        fromShow.value = from;
        toShow.value = to; 
    }

    fetchDataProductSaleOff();
</script>

