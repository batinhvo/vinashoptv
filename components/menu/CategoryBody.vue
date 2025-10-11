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
    const openCategory = ref<string | null>(null);

    const cateStore = useCateStore();
    // ✅ computed để tự động theo dõi khi store thay đổi
    const dataCategories = computed<Category[]>(() => cateStore.categories);

    // ✅ fetch khi chưa có dữ liệu (tránh lỗi SSR)
    onMounted(async () => {
        if (!cateStore.categories.length) {
            await cateStore.fetchCategories();
        }
    });

</script>

<style lang="css" scoped>
    .text-xs {
        font-size: 8px !important;
    }
</style>
