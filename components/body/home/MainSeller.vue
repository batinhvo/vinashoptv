<template>
    <div class="container mx-auto mb-8">
        <div class="flex flex-wrap">
            <div v-for="(item, index) in images" :key="index" class="w-full lg:w-1/2 p-4">
                <NuxtLink :to="item.link" class="block border border-[#00890c] shadow-[3px_2px_5px_1px_#898989]">
                    <NuxtImg :src="item.img" :alt="item.desc" />
                </NuxtLink>
            </div>           
        </div>
    </div>
</template>

<script setup lang="ts">
    const images = [
        {
            img : '/images/banner/best-seller.jpg',
            desc : 'Best Seller',
            link : '/bestseller'
        },
        {
            img : '/images/banner/on-sale.jpg',
            desc : 'On Sale',
            link: '/saleoff'
        }
    ]
</script>
