<template>
    <div class="w-full bg-white shadow-lg border border-gray-100 rounded-lg pb-3">
        <div class="px-8 py-4 border-b border-gray-100 text-base">Browse Categories</div>
        <ul class="px-2">
            <MenuContentMenuBody 
                v-for="(cate, index) in dataCatePro" 
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
    const dataCatePro = ref<Category[]>([]);
    const openCategory = ref<string | null>(null);

    const cateStores = useCateStore();

    const fetchCateData = async () => {
        await cateStores.fetchCategories();
        dataCategories.value = cateStores.categories || [];

        dataCatePro.value = dataCateProcessing(dataCategories.value);
    };

    const dataCateProcessing = (dataCate: Category[]): Category[] => {
        const parentCate: Category[] = [];
        const categoryMap = new Map<number, Category>(); // Map of category

        // Gán từng danh mục vào Map
        dataCate.forEach((cate) => {
            categoryMap.set(cate.id, {...cate, children: [] });
        });

        //Gán các phần tử con vào đúng cha
        dataCate.forEach((cate) => {
            if (cate.parentId === 0) {
                parentCate.push(categoryMap.get(cate.id)!);
            } else {
                const parent = categoryMap.get(cate.parentId);
                if (parent) {
                    parent.children?.push(categoryMap.get(cate.id)!);
                }
            }
        });

        // Sắp xếp danh mục theo `sort`
        const sortCategories = (categories: Category[]): Category[] => {
            return categories
            .sort((a, b) => a.sort - b.sort)
            .map((cate) => ({
                ...cate,
                children: cate.children ? sortCategories(cate.children) : [],
            }));
        };

        return sortCategories(parentCate);
    }
    fetchCateData();

</script>

<style lang="css" scoped>
    .text-xs {
        font-size: 8px !important;
    }
</style>