<template>
    <img class="w-full" :src="Imgsource" :key="Imgsource" :alt="propImgs.altImg" crossorigin="anonymous" /> 
</template>

<script setup lang="ts">
    const propImgs =  defineProps<{
        linkImg?: string;
        altImg?: string;
    }>();

    const Imgsource = ref<string>("");
    
    //------------------------------API------------------------------//
    const imageProductStore = useImagesProduct();
    const getImages = async () => {
        Imgsource.value = await imageProductStore.fetchImagesProduct(propImgs.linkImg!) || '';
    }
    getImages();
    
</script>