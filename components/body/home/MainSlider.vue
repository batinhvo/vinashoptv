<template>
    <div class="bg-[url('assets/images/bg-slide.jpg')] bg-cover bg-top-center relative">
        <swiper
        :slidesPerView="1"     
        :pagination="{ clickable: true }"
        :modules="[Pagination]"
        @slideChange="handleSlideChange"
        class="container min-h-[420px]">
            <swiper-slide v-for="(slide, index) in slides" :key="index">       
                <div class="flex flex-wrap py-8 lg:py-4">
                    <div class="w-2/5 lg:w-3/5 mt-5 px-4 content" :class="{ active: currentSlideIndex === index }">
                        <div class="text-left xl:ml-96 max-w-[500px]">
                            <div class="text-2xl md:text-6xl my-2 font-light in-top">{{ slide.title }}</div>
                            <div  v-if="slide.subtitle" class="text-2xl font-light mb-3 in-top-2">{{ slide.subtitle }}</div>
                            <div class="font-bold text-font-15 mb-3 in-top-2">{{ slide.description }}</div>
                            <div class="mb-4 in-top-3">
                                <span class="font-normal in-top-3 leading-none md:leading-loose">FROM</span>
                                <div class="text-3xl md:text-5xl font-bold leading-[3.5rem]">
                                    <sup>$</sup><span>{{ slide.price }}</span><sup>{{ slide.sub }}</sup>
                                </div>
                            </div>
                            <NuxtLink :to="`/product/${dataLinkPro}`">
                                <button class="in-top-3 btn btn-primary bg-primary py-2 px-5 lg:px-12 rounded-lg text-base text-gray-22 font-normal hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)]">
                                    Start Buying
                                </button>
                            </NuxtLink>                           
                        </div>                       
                    </div>

                    <div class="w-3/5 lg:w-2/5 px-4">
                        <NuxtImg 
                            :src="slide.image" 
                            class="zoom-in-image w-[320px]" 
                            :class="{'active-image': currentSlideIndex === index, 'inactive-image': currentSlideIndex !== index}"
                            :key="currentSlideIndex === index ? 'active-' + index : 'inactive-' + index" 
                            :alt="slide.alt" />
                    </div>
                </div>               
            </swiper-slide>
        </swiper>
        
    </div>
</template>
  
<script setup lang="ts">
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { Pagination } from 'swiper/modules';
    import 'swiper/css';
    import 'swiper/css/pagination';

    // Dữ liệu các slide
    const slides = ref([
        {
            title: 'King\'s Golden Oils',
            subtitle: '',
            description: 'Made in USA',
            price: 55,
            sub: "95",
            image: '/images/banner/banner-03.png',
            alt: 'king-golden-oils-promotion-image',
        },
        {
            title: 'Premium Yuki Collagen',
            subtitle: '(30 sticks)',
            description: 'Made in Japan',
            price: 145,
            sub: "00",
            image: '/images/banner/banner-04.png',
            alt: 'Premium-Yuki-Collagen-promotion-image',
        },
    ]);     

    const currentSlideIndex = ref(0);

    const handleSlideChange = (swiper: any) => {
        currentSlideIndex.value = swiper.realIndex;
    };


    //-----------------------------------------------------//
    const productStore = useProductStore();

    const params = ref("39");
    const dataLinkPro = ref("");

    await productStore.fetchProductDetails(params.value);
    dataLinkPro.value = productStore.productDetails?.slug || '';
    
</script>
  
<style scoped>
    /* animation images */
    .zoom-in-image {
        opacity: 0;
        visibility: hidden;
        transition: opacity 1.5s ease-out, transform 1.5s ease-out;
    }

    .active-image {
        opacity: 0;
        visibility: hidden;
        transform: scale(1);
        animation: zoomInEffect 1.5s ease-out forwards;    
    }

    .zoom-in-image.active-image {
        animation-delay: 1s;
    }

    .inactive-image {
        opacity: 0;
        visibility: hidden;
        transform: scale(0.9);
        animation: zoomOutEffect 0.3s ease-in forwards;
    }

    @keyframes zoomInEffect {
        0% {           
            opacity: 0;
            visibility: hidden;
            transform: translateX(100%) scale(0.8);
        }
        100% {
            opacity: 1;
            visibility: visible;
            transform: translateX(0) scale(1);
        }
    }

    /* animation content */
    .content .in-top,
    .content .in-top-2,
    .content .in-top-3 {
        opacity: 0;
        transition: opacity 0.5s ease-out, transform 0.5s ease-out;
    }

    .content.inactive {
        opacity: 0;
        visibility: hidden;
    }

    .content.active .in-top {
        animation-delay: 0.5s;
        animation: fadeInEffect 1.5s ease-out forwards; 
    }

    .content.active .in-top-2 {
        animation: fadeInEffect 1.5s ease-out forwards;
        animation-delay: 0.5s;
    }

    .content.active .in-top-3 {
        animation: fadeInEffect 1.3s ease-out forwards;
        animation-delay: 0.8s;
    }

    @keyframes fadeInEffect {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .swiper-pagination-bullet-active {
        opacity: var(--swiper-pagination-bullet-opacity, 1);
        width: 1.87512rem;
        background-color: #20d600 !important;
        border-radius: 6.1875rem;
    }
</style>
  