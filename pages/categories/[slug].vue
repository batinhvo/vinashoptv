<template>
    <div>
        <div>
            <NuxtImg :src="imgBanner" class="w-full" alt="" />
        </div>
        <div class="container mx-auto min-h-[500px]">
            <div class="my-0 md:my-10">
                <ul class="flex items-center bg-zinc-100 md:bg-white pl-2 xl:pl-0">
                    <li class="px-3 py-2 hover:bg-zinc-100 rounded hover:border hover:border-gray-200"><a href="/">Home</a></li>
                    <li class="px-2"><i class="ec ec-arrow-right-categproes"></i></li>
                    <li class="px-3 py-2 md:bg-zinc-100 hover:bg-gray-200 rounded md:border md:border-gray-100"><a :href="`/categories/${slug}`">{{ cateTitle }}</a></li>
                </ul>
            </div>           

            <div class="flex flex-wrap">
                <!-- left -->
                <div class="w-full xl:w-1/5 px-4 hidden xl:block">          
                    <BodyProductMenuNav />
                </div>

                <!-- right -->
                <div class="w-full xl:w-4/5 px-4">          
                    <div class="flex justify-between mb-4">
                        <h3 class="text-2xl">{{ cateTitle }}</h3>
                        <p>Showing 1-2 of 2 results</p>
                    </div>
                    <div class="bg-neutral-100 border border-zinc-200 p-1 rounded-lg relative">
                        <button class="w-48 h-10 px-5 rounded-full flex items-center justify-between border" :class="[isOpenSort ? 'bg-white border-neutral-200' : 'bg-zinc-100 border-neutral-300']" @click="toggleOpenSort()">
                            <div class="text-neutral-500 overflow-hidden whitespace-nowrap w-11/12 text-left"> {{ selectedSort }} </div>       
                            <i class="fa fa-angle-down text-[9px] text-neutral-500 pl-1.5"></i>                    
                        </button>
                        <div v-if="isOpenSort" class="absolute z-40 top-15 mt-2 bg-white shadow-lg border border-gray-100 rounded-lg">
                            <ul class="py-2 px-1">
                                <li class="px-4 py-1 hover:bg-gray-100 rounded cursor-pointer" @click="setSort('Default Sorting')">Default Sorting</li>
                                <li class="px-4 py-1 hover:bg-gray-100 rounded cursor-pointer" @click="setSort('Sort by Price: Low to Hight')">Sort by Price: Low to Hight</li>
                                <li class="px-4 py-1 hover:bg-gray-100 rounded cursor-pointer" @click="setSort('Sort by Price: Hight to Low')">Sort by Price: Hight to Low</li>
                                <li class="px-4 py-1 hover:bg-gray-100 rounded cursor-pointer" @click="setSort('Sort by Lates')">Sort by Lates</li>
                            </ul>
                        </div>
                    </div>
                    <BodyProductDisplay :cateTitle="cateTitle" :slugCate="slug" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const imgBanner = '/images/banner/bg-banner-01.jpg';

    const isOpenSort = ref(false);
    function toggleOpenSort() {
        isOpenSort.value = !isOpenSort.value;
    }

    const selectedSort = ref('Default Sorting');
    function setSort(sortOption: string) {
        selectedSort.value = sortOption;
        isOpenSort.value = false;
    }

    //----------------------------API------------------------------------//
    const route = useRoute();
    const productStore = useProductStore();
    const cateStore = useCateStore();

    const slug = route.params.slug as string;

    await cateStore.fetchCate();

    const cateTitle = cateStore.categories.filter((cate) => cate.slug === slug).map((cate) => cate.name).join('');
    const categoryId = cateStore.categories.filter((cate) => cate.slug === slug).map((cate) => cate.id).join('');

    await productStore.fetchProducts(categoryId);
    
</script>

