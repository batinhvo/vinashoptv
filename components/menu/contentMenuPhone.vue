<template>
    <li>
        <div class="flex justify-between items-center py-2" @click.prevent="toggleMenu(cate.name)">
            <NuxtLink v-if="cate.status === 'active'"
            :class="[(cate.name === 'SPECIAL' || openCategory === cate.name) ? 'font-bold' : '']" 
            :to="`/categories/${cate.slug}`" @click.prevent="handleToggleMenu"> 
                {{ cate.name }} 
            </NuxtLink>
            <button v-if="cate.children && cate.children.length > 0">
                <i class="fa text-[8px] text-black" :class="[openCategory === cate.name ? 'fa-angle-up' : 'fa-angle-down']"></i>
            </button>
        </div> 

        <!-- menuShow -->
        <transition name="menuShow">
            <div v-if="cate.children && cate.children.length > 0" v-show="openCategory === cate.name" class="max-h-[340px] overflow-x-auto">
                <ul class="px-2" :class="[openCategory === cate.name ? 'bg-zinc-50 border-l border-zinc-200 pl-4' : '']">
                    <MenuContentMenuPhone 
                        v-for="(subCate, subIndex) in cate.children" 
                        :key="subIndex" 
                        :cate="subCate"
                        :openCategory="openSubCategory"
                        @update:openCategory="openSubCategory = $event"
                        :toggleMobileMenu="toggleMobileMenu"
                    />
                </ul>
            </div>                
        </transition>         
    </li>     
</template>

<script setup lang="ts">
    import { type Category } from "types/categoryTypes";

    const data = defineProps<{
        cate: Category; 
        openCategory: string | null;
        toggleMobileMenu: () => void;
    }>();

    const openSubCategory = ref<string | null>(null);

    const emitCate = defineEmits(['update:openCategory']);

    const toggleMenu = (key: string) => {
        emitCate('update:openCategory', data.openCategory === key ? null : key);
    };

    const handleToggleMenu = () => {
        data.toggleMobileMenu();
    };
</script>

<style lang="css" scoped>
    .menuShow-content {
        transition: max-height 0.5s ease;
        max-height: 0;
        overflow: hidden;
    }

    .menuShow-enter-active, .menuShow-leave-active {
        transition: max-height 0.5s ease;
    }

    .menuShow-enter-to, .menuShow-leave-from {
        max-height: 340px;
    }

    .menuShow-enter-from, .menuShow-leave-to {
        max-height: 0;
    }
</style>