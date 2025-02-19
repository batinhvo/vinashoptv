<template>
    <li 
        class="border-b py-1.5 px-4 hover:bg-neutral-100 cursor-pointer relative"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
    >
        <NuxtLink v-if="cate.slug"      
        :class="['flex justify-between items-center hover:text-black hover:font-bold', (cate.name === 'SPECIAL') ? 'font-bold' : '']"
        :to="`/categories/${cate.slug}`"
        >
        {{ cate.name }}
        <i v-if="cate.children && cate.children.length > 0" class="fa fa-angle-right text-neutral-400"></i>
        </NuxtLink>

        <!-- Submenu -->
        <ul v-if="cate.children && cate.children.length > 0" 
            v-show="isHovered"
            class="bg-white shadow-md absolute rounded-lg left-full mt-0 w-[270px] z-50 top-0 p-2">
            <MenuContentMenuHeader
            v-for="(subCate, subIndex) in cate.children"
            :cate="subCate"
            :key="subIndex"
            />
        </ul>
    </li>
</template>

<script setup lang="ts">
    import { type Category } from "types/categoryTypes";

    const data = defineProps<{
        cate: Category;
    }>();

    const isHovered = ref(false);
</script>