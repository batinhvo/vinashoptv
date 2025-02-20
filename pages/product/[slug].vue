<template>
    <div>
        <div>
            <NuxtImg :src="imgBanner" class="w-full" alt="" />
        </div>
        <div class="container mx-auto" v-if="dataDetails">
            <!-- header -->
            <div class="my-0 md:my-10 overflow-x-auto whitespace-nowrap max-w-[450px] md:max-w-full">
                <ul class="flex items-center bg-zinc-100 md:bg-white py-2 xl:py-0 pl-2 xl:pl-0">
                    <li class="px-3 py-2 hover:bg-zinc-100 rounded hover:border hover:border-gray-200"><a href="/">Home</a></li>
                    <li class="px-2"><i class="ec ec-arrow-right-categproes"></i></li>
                    <li class="px-3 py-2 md:bg-zinc-100 hover:bg-gray-200 rounded md:border md:border-gray-100"><NuxtLink v-if="cateSlug" :to="`/categories/${cateSlug}`">{{ cateTitle }}</NuxtLink></li>
                    <li class="px-2"><i class="ec ec-arrow-right-categproes"></i></li>
                    <li class="px-3 py-2 rounded">{{ dataDetails.title }}</li>
                </ul>
            </div>         
            
            <!-- main -->
            <div class="flex flex-wrap mb-6 mt-5 md:mt-0">
                <div class="w-full md:w-1/2 lg:w-1/3 xl:w-5/12 px-4">
                    <BodyProductSlideImage :dataImages="listImages" :dataAlt="dataDetails.title"/>              
                </div>

                <div class="w-full md:w-1/2 lg:w-1/3 xl:w-4/12 px-4 mt-8 md:mt-0">
                    <div class="text-xs mb-2">{{ cateTitle }}</div>
                    <div class="text-2xl">{{ dataDetails.title }}</div>
                    <div class="text-right mb-2 pr-3">Sold: {{ dataDetails.totalOutFake }}</div>
                    <p class="text-justify">
                        {{ dataDetails.summary }}
                    </p>
                </div>

                <div class="w-full md:w-full lg:w-1/3 xl:w-3/12 px-4 mt-8 xl:mt-0">
                    <BodyProductSelectionProductType :dataPro="dataDetails" :dataVariant="dataVariant" @updateSlideImages="updateSlideImages"/>
                </div>
            </div>
        </div>
        <BodyProductDesc :contentPro="dataDetails?.content" :howToUsePro="dataDetails?.howToUse"/>
    </div>
</template>

<script setup lang="ts">
    import type { ProductDetails, Variant } from "types/productDetailTypes";

    const imgBanner = '/images/banner/bg-banner-01.jpg';

    //-----------------------------API------------------------------//

    const route = useRoute();
    const cateStore = useCateStore();
    const productDetailStore = useProductDetailStore();

    const slug = route.params.slug as string | '';
    const dataDetails = ref<ProductDetails | null>(null);
    const dataVariant = ref<Variant[]>([]);
    const cateTitle = ref('');
    const cateSlug = ref('');

    const listImages: string[] = [];
    
    const getImages = () => {
        if(dataDetails.value) {
            listImages.push(dataDetails.value.media) 
        }

        const mediaList = dataVariant.value.flatMap(variant => variant.options.map(option => option.media).filter(media => media !== ""));
        
        if(mediaList) {
            listImages.push(...mediaList);
        }
    }

    const updateSlideImages = (variantOptionIds: string) => {
        const optId = variantOptionIds.split(",").map(Number); // Chuyển thành số

        const mediaList = dataVariant.value.flatMap(variant =>
            variant.options
                .filter(option => optId.includes(option.id)) // Chỉ lấy option có id khớp
                .map(option => option.media) // Lấy media của option đó
        );

        console.log(mediaList);
    }


    const fetchDataProduct = async () => {
        await productDetailStore.fetchProductDetails(slug);
        dataDetails.value = productDetailStore.productDetails;

        cateTitle.value = cateStore.dataCatePro.find((cate) => cate.id === dataDetails.value?.categoryId)?.name || '';
        cateSlug.value = cateStore.dataCatePro.find((cate) => cate.id === dataDetails.value?.categoryId)?.slug || '';

        dataVariant.value = dataDetails.value?.variants || [];
        getImages();
    }

    fetchDataProduct();

</script>



