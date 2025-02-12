<template>
    <div class="flex flex-wrap relative my-5">
        <div v-for="pro in dataProduct.proDataList" :key="pro.id" class="w-1/2 md:w-1/4 py-4 mb-4 hover:shadow-[0_0_6px_0_rgba(1,1,1,0.3)]">
            <div class="mb-2 px-6">
                <NuxtLink :to="`/categories/${dataProduct.slugCate}`" class="text-xs">{{ dataProduct.titleCate }}</NuxtLink>
            </div>
            <div class="px-6 border-x border-zinc-100">
                <div class="relative group">
                    <button @click="openShowQuickView(pro)">                       
                        <BodyProductImages :linkImg="pro.media" :altImg="pro.title" />
                    </button>
                    
                    <div class="pop-up">
                        <button class="btn text-black bg-primary py-1.5 px-4 rounded-md hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)] hover:-translate-y-1 duration-300"
                            @click="openShowQuickView(pro)">
                            Quick View
                        </button>                                              
                        <NuxtLink
                        :to="`/product/${pro.slug}`"
                        class="btn text-black bg-primary py-1.5 px-4 rounded-md hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)] hover:-translate-y-1 duration-300 mt-6"
                        >
                            See Details
                        </NuxtLink>
                    </div>
                </div>
                <div class="mt-2">
                    <NuxtLink :to="`/product/${pro.slug}`">
                        <div class="text-xs lg:text-sm text-[#167000] hover:text-[#104f00] font-bold line-clamp-2">{{ pro.title }}</div>
                    </NuxtLink>
                    <div class="text-xs line-clamp-2 my-5">{{ pro.summary }}</div>         
                </div>
            </div>
            <div class="flex justify-between items-end products-end mt-3 px-6">
                <div class="text-base lg:text-xl">${{ pro.minPrice }}</div>     
            </div>
        </div>   
        <ModalPages v-if="showQuickView" @close="showQuickView = false">
            <template #body>
                <ModalPopupProductQuickView 
                :products="productData" 
                :cateTitle="dataProduct.titleCate" 
                />
            </template>           
        </ModalPages>
    </div>
</template>

<script setup lang="ts">
    import { type Products } from 'types/productTypes';

    //show modal
    const showQuickView = ref(false);
    const productData = ref<Products | null>(null);
    const openShowQuickView = (proData: Products) => {
        productData.value = proData;
        showQuickView.value = true;
    };

    defineProps({
        dataProduct: {
            type: Object as PropType<{ 
                titleCate?: string; 
                slugCate?: string; 
                proDataList?: Products[] 
            }>,
            required: true
        }
    });
</script>

<style lang="css" scoped>
    .pop-up {
        display: none;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background: #ffffffdb;
    }

    @media (min-width: 1024px) {
        .group:hover .pop-up {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }
    }
</style>