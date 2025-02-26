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
                    <div class="flex justify-between mb-4">
                        <h3 class="text-2xl">Sale Off</h3>
                        <p>Showing 1-{{ totalProducts < 8 ? totalProducts : 8 }} of {{ totalProducts }} results</p>
                    </div>
                    <BodyProductSelectSort @updateParams="updateProductsFromSort"/>
                    <BodyProductDisplay :dataProduct="productListData"/>
                    <BodyProductPagination v-if="totalProducts > 0" :dataTotalPro="totalProducts" @updatePages="updatePages"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { type Products } from "types/productTypes";

    definePageMeta({middleware: 'auth-middle'})

    const imgBanner = '/images/banner/bg-banner-01.jpg';

    //----------------------------API------------------------------------//

    const productStore = useProductStore();

    const productListData = ref<Products[]>([]);
    const totalProducts = ref(0);

    interface Params {
        descending: number;
        page: number;
        perPage: number;
        sale?: number;
        sortBy: string,
    };

    const params = ref<Params>({
        descending: 1,
        page: 1,
        perPage: 8,
        sale: 1,
        sortBy: 'createdAt',
    });

    const fetchDataProductSaleOff = async () => {        
        await productStore.fetchProducts(params);
        productListData.value = productStore?.products || [];
        totalProducts.value = productStore.productTotal || 0;
    }
    
    const updateProductsFromSort = async (sortBy: string, descending: number) => {
        params.value.sortBy = sortBy;
        params.value.descending = descending;
        fetchDataProductSaleOff();
    };

    const updatePages = async (page: number) => {
        params.value.page = page;
        fetchDataProductSaleOff();
    };

    fetchDataProductSaleOff();
</script>

