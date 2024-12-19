<template>
    <div class="bg-[url('assets/images/bg-slide.jpg')] bg-cover bg-top-center">
        <carousel :height="450" v-bind="config" class="container mx-auto" @slide-end="handleSlideEnd">
            <Slide v-for="(slide, index) in slides" :key="index">
                <div class="mx-auto">
                    <div class="flex flex-wrap lg:flex-nowrap">
                        <!-- Nội dung -->
                        <div class="lg:w-2/3 w-1/2 text-left lg:mr-24 pl-5 pr-3 pt-1 lg:p-0 content" 
                        :key="currentSlideIndex === index ? 'active-' + index : 'inactive-' + index"
                        :class="{'active': currentSlideIndex === index, 'inactive': currentSlideIndex !== index}">
                            <h1 class="text-2xl lg:text-6xl my-2 font-light in-top">{{ slide.title }}</h1>
                            <h6 v-if="slide.subtitle" class="text-2xl font-light mb-3 in-top-2">{{ slide.subtitle }}</h6>
                            <h6 class="font-bold text-font-15 mb-3 in-top-2">{{ slide.description }}</h6>
                            <div class="mb-4 in-top-3">
                                <span class="font-normal in-top-3 leading-none md:leading-loose">FROM</span>
                                <div class="text-3xl lg:text-5xl font-bold leading-[3.5rem]">
                                    <sup>$</sup><span>{{ slide.price }}</span><sup>00</sup>
                                </div>
                            </div>
                            <button class="in-top-3 btn btn-primary bg-primary py-2 px-5 lg:px-12 rounded-lg text-base text-gray-22 font-normal hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)]">
                                Start Buying
                            </button>
                        </div>
                        <!-- Hình ảnh -->
                        <div class="lg:w-1/3 w-1/2 p-4 lg:p-0">
                            <img 
                                :src="slide.image" 
                                class="zoom-in-image" 
                                :class="{'active-image': currentSlideIndex === index, 'inactive-image': currentSlideIndex !== index}"
                                :key="currentSlideIndex === index ? 'active-' + index : 'inactive-' + index" 
                                :alt="slide.alt" />
                        </div>
                    </div>
                </div>
            </Slide>
            <template #addons>
                <Pagination />
            </template>
        </carousel>
    </div>
</template>
  
<script setup lang="ts">
    import { ref } from "vue";
    import { Carousel, Slide, Pagination } from 'vue3-carousel';
    import 'vue3-carousel/dist/carousel.css';
  
    // Cấu hình Carousel
    const config = ref({
        itemsToScroll: 1,
        mouseDrag: true,
        touchDrag: true,
        itemsToShow: 1,     
        centerMode: true,
    });
  
    // Dữ liệu các slide
    const slides = ref([
        {
            title: 'CORDYCEPS SPECIAL',
            subtitle: '',
            description: 'BUY 2 GET 1 FREE',
            price: 199,
            image: '/images/banner/banner-01.png',
            alt: 'Cordyceps-promotion-image',
        },
        {
            title: 'MORINGA 950',
            subtitle: 'Made in USA - 90 Capsules - 1100 mg',
            description: '100% PURE, POTENT, NATURAL & ORGANIC',
            price: 30,
            image: '/images/banner/banner-02.png',
            alt: 'Moringa-promotion-image',
        },
    ]);     

    //animation chuyển slide
    const currentSlideIndex = ref(0);
    interface SlideStartEvent {
        currentSlideIndex: number;
    }
    const handleSlideEnd = (data:SlideStartEvent) => {
        currentSlideIndex.value = data.currentSlideIndex;
    }
    
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
        transition: opacity 0.3s ease-out, transform 0.3s ease-out;
    }

    .content.inactive {
        opacity: 0;
        visibility: hidden;
    }

    .content.active .in-top {
        animation: fadeInEffect 1.3s ease-out forwards; 
    }

    .content.active .in-top-2 {
        animation: fadeInEffect 1.5s ease-out forwards;
        animation-delay: 0.3s;
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
</style>
  