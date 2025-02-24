<template>
    <img class="w-full" :src="Imgsource" :key="Imgsource" :alt="propImgs.altImg" crossorigin="anonymous" /> 
</template>

<script setup lang="ts">
    const propImgs =  defineProps<{
        linkImg?: string;
        altImg?: string;
    }>();

    const Imgsource = ref<string>("");
    const imageProductStore = useImagesProduct();
    const defaultImage = "/images/default-images.jpg";

    const getImages = async () => {
        if (!propImgs.linkImg) {
            Imgsource.value = defaultImage;           
            return;
        }

        Imgsource.value = await imageProductStore.fetchImagesProduct(propImgs.linkImg) || defaultImage;
    };

    // Theo dõi `linkImg`, nếu thay đổi thì fetch lại ảnh
    watch(() => propImgs.linkImg, getImages, { immediate: true });
</script>