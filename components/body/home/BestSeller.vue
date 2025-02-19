<template>
    <div class="container mx-auto my-8">
        <div class="flex flex-wrap">
            <div v-for="pro in products" :key="pro.id" class="w-full lg:w-1/2 xl:w-1/4 py-4 px-4 xl:py-0">
                <NuxtLink v-if="pro.slug" :to="`/product/${pro.slug}`">
                    <div class="flex flex-wrap py-1 bg-neutral-100 items-center border border-inherit min-h-36 hover:border-gray-300 hover:shadow-sm">
                        <div class="w-1/2 p-2">
                            <BodyProductImages :linkImg="pro.media" :altImg="pro.title" />
                        </div>
                        <div class="w-1/2 px-4">
                            <div class="mb-2 text-lg font-light tracking-tighter">
                                {{ pro.title }}
                            </div>
                            <div class="text-base inline-block">
                                <span class="font-bold">Shop now</span>
                                <span class="relative inline-flex w-4 h-4 align-middle items-center bg-primary rounded-full ml-2">
                                    <i class="ec ec-arrow-right-categproes text-white text-font-13 mt-0.5"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const productStore = useProductStore();

    const params = ref({
        descending: 1,
        page: 1,
        perPage: 8,
        sortBy: 'createdAt',
        special: 1,
    });

    await productStore.fetchProducts(params);

    const products = computed(() => productStore.products.slice(0, 4));
</script>