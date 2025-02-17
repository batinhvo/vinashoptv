<template>
    <li>
        <div class="border-b border-gray-100 px-2">
            <div class="cursor-pointer flex justify-between cates-center hover:bg-neutral-100 px-4 py-2 group" @click.prevent="toggleMenu(cate.name)">
                <NuxtLink v-if="cate.status === 'active'" 
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
                        v-for="(subcate, subIndex) in cate.children" 
                        :key="subIndex" 
                        :cate="subcate"
                    />
                </ul>
            </div>
        </div>
    </li>
</template>

<script setup lang="ts">

    defineProps<{ cate: any; }>();

    const openCategory = ref<string | null>(null);

    const toggleMenu = (key: string) => {
        
        openCategory.value = openCategory.value === key ? null : key;
    };
    
</script>