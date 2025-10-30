<template>
    <header class="bg-white shadow-sm">
        <!-- top-header -->
        <HeaderTopBar />

        <!-- main-header-desktop -->
        <div class="container hidden xl:block">
            <div class="flex items-center py-2 xl:py-8">
                <VinaLogo />
                <HeaderSearchBar />
                <HeaderIconCartIcon />
            </div>
            <!-- menu -->
            <div class="flex items-center">
                <MenuCategoryHeader :categories="dataCategories"/>
                <HeaderMenuBar />
            </div>
        </div>      

        <!-- main-header-mobile -->
        <div class="xl:hidden h-12 bg-gray-80 pt-2 mb-1 px-3 bg-neutral-100">
            <div class="container flex justify-between">
                <div class="flex items-center">
                    <MenuCategoryPhone :categories="dataCategories"/>               
                    <div class="max-w-[250px]">
                        <VinaLogo />
                    </div>
                </div>
                <div class="flex">
                    <HeaderSearchIcon />
                    <HeaderIconUserIcon />
                    <HeaderIconCartIcon />
                </div> 
            </div>
        </div>      
    </header>
</template>

<script setup lang="ts">
    import type { Category } from 'types/categoryTypes';

    const cateStore = useCateStore();
    const dataCategories = computed<Category[]>(() => cateStore.categories);

    onMounted(async () => {
        await cateStore.getCategories()
    });

</script>
