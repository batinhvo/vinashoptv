<template>
    <div class="container mx-auto my-8">
        <div class="flex flex-wrap">
            <div v-for="(item, index) in product" :key="index" class="w-full lg:w-1/2 xl:w-1/4 py-4 px-4 xl:py-0">
                <NuxtLink :to="item.link">
                    <div class="flex flex-wrap py-1 bg-neutral-100 items-center border border-inherit min-h-36">
                        <div class="w-1/2 p-2">
                            <NuxtImg :src="item.img" class="w-full h-auto" :alt="item.title" />
                        </div>
                        <div class="w-1/2 px-4">
                            <div class="mb-2 text-lg font-light tracking-tighter">
                                {{ item.title }}
                            </div>
                            <div class="text-base inline-block">
                                <span class="font-bold">Shop now</span>
                                <span class="relative inline-flex w-4 h-4 align-middle items-center bg-primary rounded-full ml-2">
                                    <i class="ec ec-arrow-right-categproes text-white text-font-13 mt-0.5"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const product = [
        {
            img: '/images/products/fucoidan-UMI.jpg',
            title: 'Fucoidan UMI NO SHIZUKU - Capsule Dietary Supplement',
            link: 'https://beta.vinashoptv.com/detail/product/fucoidan-umi-no-shizuku-capsule-dietary-supplement.rs.html',
        },
        {
            img: '/images/products/fucoidan-AHCC.jpg',
            title: 'Fucoidan powered with AHCC\'s Drink (Liquid) Type - 50 Packets',
            link: 'https://beta.vinashoptv.com/detail/product/fucoidan-umi-no-shizuku-capsule-dietary-supplement.rs.html',
        },
        {
            img: '/images/products/gold-oil.jpg',
            title: 'King\'s Golden Oils - 0.5 fl oz. (15ml) Dầu vàng thiên tế',
            link: 'https://beta.vinashoptv.com/detail/product/fucoidan-umi-no-shizuku-capsule-dietary-supplement.rs.html',
        },
        {
            img: '/images/products/sleep-better.jpg',
            title: 'SLEEP BETTER 1000 - BUY 4 GET 1 FREE',
            link: 'https://beta.vinashoptv.com/detail/product/fucoidan-umi-no-shizuku-capsule-dietary-supplement.rs.html',
        }
    ]

    const productStore = useProductStore();

    onMounted( async () => {
        await productStore.fetchProducts;

        
    });
</script>