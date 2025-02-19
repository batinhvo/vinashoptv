<template>
    <div>
        <!-- Main Slide -->
        <swiper
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
            <swiper-slide v-for="(image, index) in images" :key="index">
                <!-- <img :src="image" class="w-full swiper-lazy" alt="Slide image" /> -->
                <BodyProductImages :linkImg="image" :altImg="dataAlt" />
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
            <swiper-slide v-for="(image, index) in images" :key="index" class="p-2 border border-gray-300 cursor-pointer" :class="{ 'active': activeIndex === index }">
                <BodyProductImages :linkImg="image" :altImg="dataAlt" />
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

    // Sử dụng kiểu `SwiperType` để khai báo
    const thumbsSwiper = ref<SwiperType | null>(null);

    // Hàm xử lý sự kiện @swiper
    const onSwiper = (swiperInstance: SwiperType) => {
        thumbsSwiper.value = swiperInstance;
    };

    // Cập nhật chỉ số slide hiện tại
    const activeIndex = ref<number>(0);
    const onSlideChange = (swiperInstance: SwiperType) => {
        activeIndex.value = swiperInstance.realIndex; 
    };

    // Mảng hình ảnh
    const images: string[] = [
        'upload/2024/12/product/d9cb61c5-dadc-4e3b-b4bb-966042adc84c.jpeg',
        'upload/2024/12/product/50fa4de0-eec8-4bc5-b77b-aed75eb4bb88.jpeg',
        'upload/2024/12/product/b9ef6ea9-794c-4252-8c9e-5e619dcf173a.jpeg',
        'upload/2024/12/product/50fa4de0-eec8-4bc5-b77b-aed75eb4bb88.jpeg',
    ];

    const data = defineProps<{
        dataImages: string;
        dataAlt: string;
    }>();

    images.push(data.dataImages)
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
