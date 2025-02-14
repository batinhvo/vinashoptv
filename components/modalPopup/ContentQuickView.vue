<template>
    <div class="text-left">
        <NuxtLink class="text-xs">{{ cateTitle }}</NuxtLink>
        <div class="text-xl mt-3">{{ products?.title }}</div>
    </div>
    <div class="flex justify-between items-end mt-5 pb-5 border-b border-gray-300">
        <div class="text-left">
            <div class="text-2xl" v-if="products">${{ formatPrice(products.minPrice) }}</div>
        </div>
        <div class="text-xs">{{ products?.totalOutFake }}</div>
    </div>
    <div class="mt-5 line-clamp-4 text-justify">{{ products?.summary }}</div>
</template>

<script setup lang="ts">
    import { type Products } from 'types/productTypes';

    //xử lý giá
    const formatPrice = (price: number): string => {
        return price % 1 === 0 ? `${price}.00` : price.toFixed(2);
    };

    defineProps<{
        products: Products | null;
        cateTitle?: string;
    }>();
</script>