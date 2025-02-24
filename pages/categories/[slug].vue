<template>
    <div>
        <div>
            <NuxtImg :src="imgBanner" class="w-full" alt="" />
             <!-- <BodyProductImages :src="cateImages" class="w-full" />{{ cateImages }} -->
        </div>
        <div class="container mx-auto min-h-[500px]">
            <div class="my-0 md:my-10">
                <ul class="flex items-center bg-zinc-100 md:bg-white pl-2 xl:pl-0">
                    <li class="px-3 py-2 hover:bg-zinc-100 rounded hover:border hover:border-gray-200"><NuxtLink to="/">Home</NuxtLink></li>
                    <li class="px-2"><i class="ec ec-arrow-right-categproes"></i></li>
                    <li class="px-3 py-2 md:bg-zinc-100 hover:bg-gray-200 rounded md:border md:border-gray-100"><NuxtLink :to="`/categories/${slug}`">{{ cateTitle }}</NuxtLink></li>
                </ul>
            </div>           

            <div class="flex flex-wrap">
                <!-- left -->
                <div class="w-full xl:w-1/5 px-4 hidden xl:block">          
                    <MenuCategoryBody />
                </div>

                <!-- right -->
                <div class="w-full xl:w-4/5 px-4">          
                    <div class="flex justify-between mb-4 mt-4 lg:mt-0">
                        <h3 class="text-2xl">{{ cateTitle }}</h3>
                        <p>Showing 1-{{ totalProducts < 8 ? totalProducts : 8 }} of {{ totalProducts }} results</p>
                    </div>
                    <BodyProductSelectSort @updateParams="updateProductsFromSort"/>
                    <BodyProductDisplay :dataProduct="productListData"/>
                    <BodyProductPagination :dataTotalPro="totalProducts"/>
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

    const slug = route.params.slug as string;
    const productListData = ref<Products[]>([]);
    const totalProducts = ref(0);
    const cateTitle = ref('');
    const cateImages = ref('');
    
    const params = ref({
        categoryId: 0,
        descending: 1,
        page: 1,
        perPage: 8,
        sortBy: 'createdAt'
    });

    const updateProductsFromSort = async (sortBy: string, descending: number) => {
        params.value.sortBy = sortBy;
        params.value.descending = descending;

        updateProducts();
    }

    const updateProducts = async () => {
        await productStore.fetchProducts(params);
        productListData.value = productStore?.products || []; 
        totalProducts.value = productStore.productTotal || 0;
    };

    const fetchData = async () => {
        await cateStore.fetchCategories();

        const category = cateStore.dataCatePro.find((cate) => cate.slug === slug);
        if (category) {
            params.value.categoryId = category.id; // Gán ID vào params
            cateTitle.value = category.name;
            if(category.media) {
                cateImages.value = category.media;
            } else {
                cateImages.value = "/images/banner/bg-banner-01.jpg";
            }
            console.log(cateImages.value)
        }

        updateProducts();
    };
    
    fetchData();
</script>

