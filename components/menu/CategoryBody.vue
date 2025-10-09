<template>
    <div class="w-full bg-white shadow-lg border border-gray-100 rounded-lg pb-3">
        <div class="px-8 py-4 border-b border-gray-100 text-base">Browse Categories</div>
        <ul class="px-2">
            <MenuContentMenuBody 
                v-for="(cate, index) in dataCategories" 
                :key="index" 
                :cate="cate" 
                :openCategory="openCategory"
                @update:openCategory="openCategory = $event"
            />
        </ul>
    </div>                    
</template>

<script setup lang="ts">
    import { type Category } from "types/categoryTypes";

    const dataCategories = ref<Category[]>([]);
    const openCategory = ref<string | null>(null);

    const cateStores = useCateStore();

    const fetchCateData = async () => {
        await cateStores.fetchCategories();
        dataCategories.value = cateStores.categories || [];
    };
    fetchCateData();

</script>

<style lang="css" scoped>
    .text-xs {
        font-size: 8px !important;
    }
</style>
