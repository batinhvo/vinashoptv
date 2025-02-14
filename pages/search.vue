<template>
    <div>
        <div>
            <NuxtImg :src="imgBanner" class="w-full" alt="" />
        </div>
        <div class="container mx-auto min-h-[500px]">
            <div class="flex flex-wrap my-0 md:my-10">
                <!-- left -->
                <div class="w-full xl:w-1/5 px-4 hidden xl:block">          
                    <BodyProductMenuNav />
                </div>

                <!-- right -->
                <div class="w-full xl:w-4/5 px-4">          
                    <div class="flex justify-end mb-4">
                        <!-- <h3 class="text-2xl">Best Seller</h3> -->
                        <p>Showing 1-2 of 2 results</p>
                    </div>
                    <BodyHomeSelectSort />
                    <BodyProductDisplay :dataProduct="productListData"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { type Products } from "types/productTypes";
    const imgBanner = '/images/banner/bg-banner-01.jpg';

    //----------------------------API------------------------------------//

    const route = useRoute();
    const cateStore = useCateStore();
    const productStore = useProductStore();
    
    const keyword = ref(route.query.keyword?.toString() || "");
    const category = ref(route.query.category?.toString() || "");
    const cateParentId = ref();

    interface Params {
        descending: number,
        page: number,
        perPage: number,
        search: string,
        categoryId?: number,
        sortBy: 'createdAt',

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

    watch(
        () => route.query.keyword,
        (newKeyword) => {
            const sanitizedKeyword = newKeyword?.toString() || ""; //Nếu newKeyword không phải null hoặc undefined, nó sẽ được chuyển thành chuỗi (toString()).
            
            if (sanitizedKeyword !== keyword.value) {
                keyword.value = sanitizedKeyword;
                params.value.search = keyword.value;
                updateProducts();
            } 
        },
        { immediate: true }
    );

    watch(
        () => route.query.category,
        (newCategory) => {
            const sanitizedCategory = newCategory?.toString() || "";
            if(sanitizedCategory) {
                cateParentId.value = cateStore.categories.find((cate) => cate.slug === sanitizedCategory)?.id;
                params.value.categoryId = cateParentId.value;
                updateProducts();
            } else {
                delete params.value.categoryId;
            }
        },
        { immediate: true }
    );

    updateProducts();   
</script>
