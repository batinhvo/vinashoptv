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
                        <p>Showing {{ fromShow }}-{{ toShow }} of {{ totalProducts }} results</p>
                    </div>
                    <BodyProductSelectSort @updateParams="updateProductsFromSort" />
                    <BodyProductDisplay :dataProduct="productListData"/>
                    <BodyProductPagination v-if="totalProducts > 0 && toShow > 1" 
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

    const route = useRoute();
    const cateStore = useCateStore();
    const productStore = useProductStore();
    
    const totalProducts = computed(() => productStore.productTotal || 0);
    const keyword = ref(route.query.keyword?.toString() || "");
    const isUpdateSort = ref(false);
    const cateParentId = ref();
    const fromShow = ref(1);
    const toShow = ref(1);

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
        perPage: 20,
        search: keyword.value,
        sortBy: 'createdAt',
    });

    const productListData = ref<Product[]>([]);

    const updateProducts = async () => {
        await productStore.fetchProducts(params);
        productListData.value = productStore?.productList || []; 
    };

    //sort products by price
    const updateProductsFromSort = async (sortBy: string, descending: number) => {
        isUpdateSort.value = true;

        params.value.sortBy = sortBy;
        params.value.descending = descending;
        params.value.page = 1;
        updateProducts();
    };

    const updatePages = async (page: number) => {
        params.value.page = page;
        updateProducts();

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
