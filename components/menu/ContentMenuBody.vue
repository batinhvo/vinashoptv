<template>
    <li>
        <div class="border-b border-gray-100 px-2" v-if="cate.name !== 'SPECIAL'">
            <div class="cursor-pointer flex justify-between cates-center hover:bg-neutral-100 px-4 py-2 group" @click.prevent="toggleMenu(cate.name)">
                <NuxtLink v-if="cate.status === 'active' && cate.slug" 
                :to="`/categories/${cate.slug}`" 
                class="group-hover:font-bold hover:text-primary" 
                :class="[openCategory === cate.name ? 'font-bold' : '']">
                    {{ cate.name }}
                </NuxtLink>
                <button v-if="cate.children && cate.children.length > 0">
                    <i class="text-xs fa" :class="[openCategory === cate.name ? 'fa-angle-up' : 'fa-angle-down']"></i>
                </button>
            </div>  

            <!-- Submenu -->
            <div v-if="cate.children && cate.children.length > 0" v-show="openCategory === cate.name">
                <ul class="px-2">
                    <MenuContentMenuBody 
                        v-for="(subCate, subIndex) in cate.children" 
                        :key="subIndex" 
                        :cate="subCate"
                        :openCategory="openSubCategory"
                        @update:openCategory="openSubCategory = $event"
                    />
                </ul>
            </div>
        </div>
    </li>
</template>

<script setup lang="ts">
    import { type Category } from "types/categoryTypes";

    const data = defineProps<{ 
        cate: Category; 
        openCategory: string | null;
    }>();

    const openSubCategory = ref<string | null>(null);

    const emit = defineEmits(['update:openCategory']);
    const toggleMenu = (key: string) => {
        emit('update:openCategory', data.openCategory === key ? null : key);
    };
    
</script>
