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
                    <BodyProductSlideImage :dataImages="listImages" :dataAlt="dataDetails.title" :imageChoice="imageChoice"/>              
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
    definePageMeta({middleware: 'auth-middle'})

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
    const imageChoice = ref(0);
    const listImages = ref<{ id: number; media: string }[]>([]);
    
    const getImages = () => {
        if (dataDetails.value) {
            listImages.value = [{ id: dataDetails.value.id, media: dataDetails.value.media }];
        }

        const mediaList = dataVariant.value.flatMap(variant => variant.options
        .map(option => ({ id: option.id, media: option.media }))
        .filter(item => item.media !== ""));

        if(mediaList) {
            listImages.value.push(...mediaList);
        }
    }

    const updateSlideImages = (variantOptionIds: string) => {
        const optId = variantOptionIds.split(",").map(Number); // Chuyển thành số

        const selectedMedia = dataVariant.value.flatMap(
            variant => variant.options.filter(
                option => optId.includes(option.id) && option.media)
                .map(option => ( option.id ))
        );

        if(selectedMedia.length > 0) {
            imageChoice.value = Number(selectedMedia.join(""));
        } else {
            imageChoice.value = 0;
        }
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



