<template>
    <div>
        <!-- Main Slide -->
        <swiper
         @swiper="onMainSwiper"
        :lazy="true"
        :slides-per-view="1"
        :loop="true"
        :navigation="{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
        }"
        :thumbs="{ swiper: thumbsSwiper }"
        :modules="[Thumbs, Navigation]"
        @slideChange="onSlideChange"
        >
            <swiper-slide v-for="(image, index) in dataImages" :key="image.id">
                <!-- <img :src="image" class="w-full swiper-lazy" alt="Slide image" /> -->
                <BodyProductImages :linkImg="image.media" :altImg="dataAlt" />
            </swiper-slide>
            <!-- Custom Navigation Buttons -->
            <div class="custom-prev">
                <i class="fa fa-arrow-left"></i>
            </div>
            <div class="custom-next">
                <i class="fa fa-arrow-right"></i>
            </div>
        </swiper>
        
        <!-- Thumbnails Slide -->
        <swiper
        @swiper="onSwiper"
        :lazy="true"
        :loop="true"
        :space-between="10"
        :slides-per-view="4"
        :free-mode="true"
        :watch-slides-progress="true"
        :modules="[FreeMode, Thumbs]"
        class="mt-4"
        >
            <swiper-slide v-for="(image, index) in dataImages" :key="image.id" class="p-2 border border-gray-300 cursor-pointer" :class="{ 'active': activeIndex === index }">
                <BodyProductImages :linkImg="image.media" :altImg="dataAlt" />
            </swiper-slide>
        </swiper>
    </div>
</template>
  
<script setup lang="ts">
    import type { Swiper as SwiperType } from 'swiper';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { FreeMode, Thumbs } from 'swiper/modules';
    import { Navigation } from 'swiper/modules';
    import 'swiper/swiper-bundle.css';

    const thumbsSwiper = ref<SwiperType | null>(null);
    const mainSwiper = ref<SwiperType | null>(null); // Swiper chính

    const onSwiper = (swiperInstance: SwiperType) => {
        thumbsSwiper.value = swiperInstance;
    };

    const onMainSwiper = (swiperInstance: SwiperType) => {
        mainSwiper.value = swiperInstance;
    };

    const activeIndex = ref<number>(0);

    const onSlideChange = (swiperInstance: SwiperType) => {
        activeIndex.value = swiperInstance.realIndex; 
    };

    const data = defineProps<{
        dataImages: {id: number; media: string}[];
        dataAlt: string;
        imageChoice?: number;
    }>();

    watch(() => data.imageChoice, (newVal) => {
        if (!newVal) return; 

        if (mainSwiper.value) {
            const index = data.dataImages.findIndex(img => img.id === newVal);
            if (index !== -1) {
                mainSwiper.value.slideTo(index);
            }
        } 
    });
    
</script>

<style scoped>
    .custom-prev,
    .custom-next {
        position: absolute;
        top: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 25px;
        transform: translateY(-50%);
        z-index: 10;
        cursor: pointer;
        font-size: 14px;
        background-color: rgba(255, 255, 255, 0.1);
        color: #fff;
    }
    .custom-prev {
        left: 10px;
    }
    .custom-next {
        right: 10px;
    }
    .custom-prev:hover,
    .custom-next:hover {
        background: #20d600;
    }

    .border.active {
        border-bottom: solid 3px #20d600 !important;
    }
</style>
