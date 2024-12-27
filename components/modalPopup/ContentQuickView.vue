<template>
    <div>
        <NuxtLink class="text-xs">{{ cate }}</NuxtLink>
        <div class="text-xl mt-3">{{ title }}</div>
    </div>
    <div class="flex justify-between items-end mt-5 pb-5 border-b border-gray-300">
        <div>
            <div v-if="disc && discPrice" class="line-through">${{ price }}.00</div>
            <div class="text-2xl" :class="[disc ? 'text-red-500': '']">${{ disc ? discPrice : price }}.00</div>
        </div>
        <div class="text-xs">Sold: {{ sold }}</div>
    </div>
    <div class="mt-5 line-clamp-4 text-justify">{{ desc }}</div>
</template>

<script setup lang="ts">
    defineProps<{
        cate: string;            
        title: string;
        desc: string;
        price: string;
        sold: string;
        disc: boolean;
        discPrice?: string;
    }>();
</script>