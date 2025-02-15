<template>
    <li>
        <div class="border-b border-gray-100 px-2">
            <div 
                class="cursor-pointer flex justify-between items-center hover:bg-neutral-100 px-4 py-2"
                @click="toggleMenu"
            >
                <NuxtLink to="/bestseller" class="hover:text-black" :class="{ 'font-bold': isOpen }" >
                    {{ item.label }}
                </NuxtLink>
                <button v-if="item.hasSubmenu">
                    <i class="fa text-xs" :class="isOpen ? 'fa-angle-up' : 'fa-angle-down'"></i>
                </button>
            </div>  

            <!-- Submenu -->
            <div v-if="item.hasSubmenu" v-show="isOpen">
                <ul class="px-2">
                    <MenuContentMenuBody 
                        v-for="(subItem, subIndex) in item.subItems" 
                        :key="subIndex" 
                        :item="subItem"
                        :level="level + 1"
                    />
                </ul>
            </div>
        </div>
    </li>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{ item: any; level: number }>();

const isOpen = ref(false);

const toggleMenu = () => {
    isOpen.value = !isOpen.value;
};
</script>