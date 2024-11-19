<template>
    <carousel v-bind="config" class="max-h-[452px] bg-[url('/images/bg-slide.jpg')]">
        <Slide v-for="slide in 3" :key="slide">
            <div class="carousel__item container flex mx-auto">
                <div class="w-1/2 mt-16 ml-80 text-left">
                    <h1 class="text-6xl mb-6 font-thin">CORDYCEPS<br>SPECIAL</h1>           
                    <h6 class="font-black text-xl">BUY 2 GET 1 FREE</h6>        
                    <div>
                        <span class="">FROM</span>
                        <div class="text-5xl font-black leading-[3rem]">
                            <sup>$</sup>
                            199
                            <sup>00</sup>
                        </div>
                    </div> 
                </div>
                <div class="w-1/2">
                        <img src="/images/banner-01.png" alt="">
                    </div>
            </div>
        </Slide>
        <template #addons>
            <navigation />
            <Pagination />
        </template>
    </carousel>
</template>

<script setup>
    import 'vue3-carousel/dist/carousel.css'
    import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

    const config = {
        autoplay: 5000,
        wrapAround: true,
        pauseAutoplayOnHover: true,
    };
</script>