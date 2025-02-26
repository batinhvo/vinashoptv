<template>
    <div>
        <div>
            <NuxtImg :src="imgBanner" class="w-full" alt="" />
        </div>
        <div class="container mx-auto min-h-[500px]">
            <div class="flex flex-wrap my-0 md:my-10">
                <!-- left -->
                <div class="w-full xl:w-1/5 px-4 hidden xl:block">          
                    <MenuCategoryBody />
                </div>

                <!-- right -->
                <div class="w-full xl:w-4/5 px-4">          
                    <div class="flex justify-end mb-4">
                        <!-- <h3 class="text-2xl">Best Seller</h3> -->
                    <p>Showing 1-{{ totalProducts < 8 ? totalProducts : 8 }} of {{ totalProducts }} results</p>
                    </div>
                    <BodyProductSelectSort @updateParams="updateProductsFromSort" />
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

    const route = useRoute();
    const cateStore = useCateStore();
    const productStore = useProductStore();
    
    const keyword = ref(route.query.keyword?.toString() || "");
    const cateParentId = ref();
    const totalProducts = computed(() => productStore.productTotal || 0);

    interface Params {
        descending: number,
        page: number,
        perPage: number,
        search: string,
        categoryId?: number,
        sortBy: string,
    }

    const params = ref<Params>({
        descending: 1,
        page: 1,
        perPage: 8,
        search: keyword.value,
        sortBy: 'createdAt',
    });

    const productListData = ref<Products[]>([]);

    const updateProducts = async () => {
        await productStore.fetchProducts(params);
        productListData.value = productStore?.products || []; 
    };

    //sort products by price
    const updateProductsFromSort = async (sortBy: string, descending: number) => {
        params.value.sortBy = sortBy;
        params.value.descending = descending;
        updateProducts();
    };

    const updatePages = async (page: number) => {
        params.value.page = page;
        updateProducts();
    };

    watch(
        () => route.query,
        (newQuery) => {
            let hasChange = false;

            // Cập nhật keyword
            const newKeyword = newQuery.keyword?.toString() || "";
            if (newKeyword !== keyword.value) {
                keyword.value = newKeyword;
                params.value.search = keyword.value;
                hasChange = true;
            }

            // Cập nhật categoryId
            const newCategory = newQuery.category?.toString() || "";
            if (newCategory) {
                const newCateId = cateStore.categories.find((cate) => cate.slug === newCategory)?.id;
                if (newCateId !== cateParentId.value) {
                    cateParentId.value = newCateId;
                    params.value.categoryId = cateParentId.value;
                    hasChange = true;
                }
            } else if (params.value.categoryId) {
                delete params.value.categoryId;
                hasChange = true;
            }

            if (hasChange) updateProducts();
        },
        { immediate: true, deep: true }
    );

    updateProducts();   
</script>
