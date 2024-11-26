<template>
    <div class="bg-[url('/images/bg-slide.jpg')] bg-cover bg-top-center">
        <carousel :height="450" v-bind="config" class="container mx-auto" @slideChange="updateSlideKey">
            <!-- Slide-1 -->
            <Slide key="slide1">
                <div class="mx-auto">
                    <div class="flex flex-nowrap">
                        <div class="w-2/3 text-left mr-24">
                            <h1 class="text-6xl my-2 font-light">CORDYCEPS<br>SPECIAL</h1>           
                            <h6 class="font-bold text-font-15 mb-3">BUY 2 GET 1 FREE</h6>        
                            <div class="mb-4">
                                <span class="font-normal">FROM</span>
                                <div class="text-5xl font-bold leading-[3.5rem]">
                                    <sup>$</sup>
                                    <span>199</span>
                                    <sup>00</sup>
                                </div>
                            </div> 
                            <button class="btn btn-primary bg-primary py-2 px-12 rounded-lg text-base text-gray-22 font-normal hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)]">Start Buying</button>
                        </div>
                        <div class="w-1/3">
                            <img :src="imageSlide1" :key="slideKey" class="zoom-in-image" alt="Cordyceps-promotion-image">
                        </div>
                    </div>
                </div>
            </Slide>

            <!-- Slide-2 -->
            <Slide key="slide2">
                <div class="mx-auto">
                    <div class="flex flex-nowrap">
                        <div class="w-2/3 text-left mr-24">
                            <h1 class="text-6xl my-2 font-light">MORINGA 950</h1>        
                            <h6 class="text-2xl mb-3 font-light">Made in USA - 90 Capsules - 1100 mg</h6>        
                            <h6 class="font-bold text-font-15 mb-3">100% PURE, POTENT, NATURAL & ORGANIC</h6>      
                            <div class="mb-4">
                                <span class="font-normal">FROM</span>
                                <div class="text-5xl font-bold leading-[3.5rem]">
                                    <sup>$</sup>
                                    <span>30</span>
                                    <sup>00</sup>
                                </div>
                            </div> 
                            <button class="btn btn-primary bg-primary py-2 px-12 rounded-lg text-base text-gray-22 font-normal hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)]">Start Buying</button>
                        </div>
                        <div class="w-1/3">
                            <img :src="imageSlide2" alt="Moringa-promotion-image" class="w-full h-auto">
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
    import { ref } from 'vue';
    import 'vue3-carousel/dist/carousel.css';
    import { Carousel, Slide, Pagination } from 'vue3-carousel';

    const config = {
        itemsToScroll: 1,
        mouseDrag: true,
        touchDrag: true,
        dragFree: false,
        itemsToShow: 1,
        snapAlign: 'center',
    };

    const imageSlide1 = ref('/images/banner-01.png');
    const imageSlide2 = ref('/images/banner-02.png');


    // Key to force re-rendering of the DOM element
    const slideKey = ref(0);

    // Update the key when the slide changes
    const updateSlideKey = () => {
        slideKey.value++; // Increment the key to force DOM re-render
    };
    
</script>

<style scoped>
    .zoom-in-image {
        width: 100%;
        opacity: 0;
        transform: scale(0.1);
        animation: zoomInEffect .5s ease-out forwards;
    }

    @keyframes zoomInEffect {
        0% {
            opacity: 0; 
            transform: translateX(100%) scale(0.1);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
</style>