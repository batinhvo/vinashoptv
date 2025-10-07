<template>
    <div class="relative">
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
                <NuxtImg :src="Imgsource" class="w-full" alt="" crossorigin="anonymous" />         
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
                        <div class="flex justify-between mb-4 mt-4 lg:mt-0 ">
                            <h3 class="text-2xl">{{ cateTitle }}</h3>
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
    </div>
</template>

<script setup lang="ts">
    import { type Product } from "types/productTypes";

    //----------------------------API------------------------------------//
    const route = useRoute();
    const cateStore = useCateStore();
    const productStore = useProductStore();
    const imageProductStore = useImagesProduct();

    const productListData = ref<Product[]>([]);
    const slug = route.params.slug as string;
    const Imgsource = ref<string>("");
    const totalProducts = ref(0);
    const isUpdateSort = ref(false);
    const cateTitle = ref('');
    const fromShow = ref(1);
    const toShow = ref(1);
    const isLoading = ref(true);
    
    const params = ref({
        categoryId: 0,
        descending: 1,
        page: 1,
        perPage: 20,
        sortBy: 'createdAt'
    });

    const updateProductsFromSort = async (sortBy: string, descending: number) => {
        isUpdateSort.value = true;

        params.value.sortBy = sortBy;
        params.value.descending = descending;
        params.value.page = 1;
        updateProducts();
    }

    const updateProducts = async () => {
        await productStore.fetchProducts(params);
        productListData.value = productStore?.productList || []; 
        totalProducts.value = productStore.productTotal || 0;
        
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

    (async () => {
        await cateStore.fetchCategories();

        const category = cateStore.dataCatePro.find((cate) => cate.slug === slug);
        if (category) {
            params.value.categoryId = category.id; // Gán ID vào params
            cateTitle.value = category.name;

            if(category.media) {
                const imageLink = encodeURIComponent(category.media)
                Imgsource.value = await imageProductStore.fetchImagesProduct(imageLink) || 'sai';
                
            } else {
                Imgsource.value = "/images/banner/bg-banner-01.jpg";
            }       
        }
        updateProducts();
        setTimeout(() => {
            isLoading.value = false;
        }, 200);
    })();

</script>

