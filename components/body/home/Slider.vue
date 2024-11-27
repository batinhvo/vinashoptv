<template>
    <div class="bg-[url('/images/bg-slide.jpg')] bg-cover bg-top-center">
        <carousel :height="450" v-bind="config" class="container mx-auto" @slide-end="handleSlideEnd">
            <Slide v-for="(slide, index) in slides" :key="index">
                <div class="mx-auto">
                    <div class="flex flex-wrap lg:flex-nowrap">
                        <!-- Nội dung -->
                        <div class="lg:w-2/3 w-full text-left mr-6 lg:mr-24" :key="currentSlideIndex === index ? 'active-' + index : 'inactive-' + index">
                            <h1 class="text-6xl my-2 font-light in-top">{{ slide.title }}</h1>
                            <h6 v-if="slide.subtitle" class="text-2xl font-light mb-3 in-top">{{ slide.subtitle }}</h6>
                            <h6 class="font-bold text-font-15 mb-3 in-top">{{ slide.description }}</h6>
                            <div class="mb-4">
                                <span class="font-normal">FROM</span>
                                <div class="text-5xl font-bold leading-[3.5rem] in-top">
                                    <sup>$</sup><span>{{ slide.price }}</span><sup>00</sup>
                                </div>
                            </div>
                            <button class="btn btn-primary bg-primary py-2 px-12 rounded-lg text-base text-gray-22 font-normal hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)]">
                                Start Buying
                            </button>
                        </div>
                        <!-- Hình ảnh -->
                        <div class="lg:w-1/3 w-full">
                            <img :src="slide.image" class="zoom-in-image" :key="currentSlideIndex === index ? 'active-' + index : 'inactive-' + index" :alt="slide.alt" />
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
    });
  
    // Dữ liệu các slide
    const slides = ref([
        {
            title: 'CORDYCEPS SPECIAL',
            subtitle: '',
            description: 'BUY 2 GET 1 FREE',
            price: 199,
            image: '/images/banner-01.png',
            alt: 'Cordyceps-promotion-image',
        },
        {
            title: 'MORINGA 950',
            subtitle: 'Made in USA - 90 Capsules - 1100 mg',
            description: '100% PURE, POTENT, NATURAL & ORGANIC',
            price: 30,
            image: '/images/banner-02.png',
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
    .zoom-in-image {
        width: 240px;
        height: 420px;
        visibility: hidden;
        animation: zoomInEffect 1.3s ease-out forwards;
        animation-delay: 1.3s;
    }

    @keyframes zoomInEffect {
        0% {           
            opacity: 0;
            visibility: hidden;
            transform: translateX(100%) scale(0.1);
        }
        100% {
            opacity: 1;
            visibility: visible;
            transform: scale(1);
        }
    }

    .in-top {
        animation: inTopEffect 1.3s ease-out forwards;
        
    }

    @keyframes inTopEffect {
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
  