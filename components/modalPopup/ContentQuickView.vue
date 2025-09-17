<template>
    <div class="text-left">
        <NuxtLink class="text-xs">{{ cateTitle }}</NuxtLink>
        <div class="text-xl mt-3">{{ products?.title }}</div>
    </div>
    <div class="flex justify-between items-end mt-5 pb-5 border-b border-gray-300">
        <div class="text-left">
            <div class="text-2xl" v-if="products">${{ formatPrice(products.minPrice) }}</div>
        </div>
        <div class="text-xs">Sold: {{ products?.totalOutFake }}</div>
    </div>
    <div class="my-5 line-clamp-4 text-justify" v-html="changeCharacter(products?.summary || '')">      
    </div>
</template>

<script setup lang="ts">
    import { type Product } from 'types/productTypes';

    //xử lý giá
    const formatPrice = (price: number): string => {
        return price % 1 === 0 ? `${price}.00` : price.toFixed(2);
    };

    const changeCharacter = (value: string): string => {
        return value
        .replace(/\n+/g, '<br>')     // Gộp tất cả \n liên tiếp thành 1 <br>
        .replace(/(<br>\s*){2,}/g, '<br>'); // Gộp nhiều <br> liên tiếp thành 1
    };

    defineProps<{
        products: Product | null;
        cateTitle?: string;
    }>();
</script>