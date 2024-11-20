<template>
    <div class="bg-[url('/images/bg-slide.jpg')] bg-cover bg-top-center">
        <carousel :height="450" :width="1430" v-bind="config">
            <!-- Slide-1 -->
            <Slide key="slide1">
                <div class="carousel__item flex justify-center items-center">
                    <div class="columns-2 flex mx-auto flex-col xl:flex-row">
                        <div class="text-left xl:mr-36 mt-10">
                            <h1 class="text-6xl mb-3 font-thin">CORDYCEPS<br>SPECIAL</h1>           
                            <h6 class="font-black text-font-15 mb-3">BUY 2 GET 1 FREE</h6>        
                            <div class="mb-4">
                                <span class="font-medium">FROM</span>
                                <div class="text-5xl font-black leading-[3.5rem]">
                                    <sup>$</sup>
                                    <span>199</span>
                                    <sup>00</sup>
                                </div>
                            </div> 
                            <button class="btn btn-primary bg-primary py-2 px-12 rounded-lg text-base text-black font-medium">Start Buying</button>
                        </div>
                        <div class="xl:mt-0">
                            <img src="/images/banner-01.png" alt="" class="w-full h-auto">
                        </div>
                    </div>
                </div>
            </Slide>

            <!-- Slide-2 -->
            <Slide key="slide2">
                <div class="carousel__item flex justify-center items-center">
                    <div class="columns-2 flex mx-auto flex-col xl:flex-row">
                        <div class="text-left xl:mr-36 mt-10">
                            <h1 class="text-6xl mb-3 font-thin">MORINGA 950</h1>           
                            <h6 class="text-font-24 mb-3">Made in USA - 90 Capsules - 1100 mg</h6>     
                            <h6 class="font-black text-font-15 mb-3">100% PURE, POTENT, NATURAL & ORGANIC</h6>        
                            <div class="mb-4">
                                <span class="font-medium">FROM</span>
                                <div class="text-5xl font-black leading-[3.5rem]">
                                    <sup>$</sup>
                                    <span>30</span>
                                    <sup>00</sup>
                                </div>
                            </div> 
                            <button class="btn btn-primary bg-primary py-2 px-12 rounded-lg text-base text-black font-medium">Start Buying</button>
                        </div>
                        <div class="xl:mt-0">
                            <img src="/images/banner-02.png" alt="" class="w-full h-auto">
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
    import 'vue3-carousel/dist/carousel.css'
    import { Carousel, Slide, Pagination } from 'vue3-carousel'

    const config = {
        itemsToScroll: 1,
        mouseDrag: true,
        touchDrag: true,
        dragFree: false,
        itemsToShow: 1,
        snapAlign: 'center',
    };
</script>