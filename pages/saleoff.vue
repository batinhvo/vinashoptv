<template>
    <div>
        <div>
            <NuxtImg :src="imgBanner" class="w-full" alt="" />
        </div>
        <div class="container mx-auto min-h-[500px]">
            <div class="my-0 md:my-10">
                <ul class="flex items-center bg-zinc-100 md:bg-white pl-2 xl:pl-0">
                    <li class="px-3 py-2 hover:bg-zinc-100 rounded hover:border hover:border-gray-200"><a href="/">Home</a></li>
                    <li class="px-2"><i class="ec ec-arrow-right-categproes"></i></li>
                    <li class="px-3 py-2 md:bg-zinc-100 hover:bg-gray-200 rounded md:border md:border-gray-100"><a href="/saleoff">Sale Off</a></li>
                </ul>
            </div>           

            <div class="flex flex-wrap">
                <!-- left -->
                <div class="w-full xl:w-1/5 px-4 hidden xl:block">          
                    <BodyProductMenuNav />
                </div>

                <!-- right -->
                <div class="w-full xl:w-4/5 px-4">          
                    <div class="flex justify-between mb-4">
                        <h3 class="text-2xl">Sale Off</h3>
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

    const productStore = useProductStore();
    const cateStore = useCateStore();

    const productListData = ref<Products[]>([]);

    const params = ref({
        descending: 1,
        page: 1,
        perPage: 8,
        sale: 1,
        sortBy: 'createdAt',
    });

    const fetchDataProductSaleOff = async () => {
        await cateStore.fetchCategories();
        await productStore.fetchProducts(params);
        productListData.value = productStore?.products || [];
    }

    fetchDataProductSaleOff();
</script>

