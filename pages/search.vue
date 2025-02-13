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
    const productStore = useProductStore();

    const keyword = ref<string>(route.query.keyword as string || '');

    const productListData = ref<Products[]>([]);

    const params = ref({
        descending: 1,
        page: 1,
        perPage: 8,
        search: keyword.value,
        sortBy: 'createdAt',
    });

    const updateProducts = async () => {
        await productStore.fetchProducts(params);
        productListData.value = productStore?.products || [];
    }

    watch(
        () => route.query.keyword, 
        (newKeyword) => {
            keyword.value = newKeyword as string || '';  
            params.value.search = keyword.value;        
            // Gọi hàm updateProducts để fetch lại dữ liệu sản phẩm
            updateProducts();
        },
        { immediate: true }  // Đảm bảo chạy ngay khi component được mount
    )
</script>
