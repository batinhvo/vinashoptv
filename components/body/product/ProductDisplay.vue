<template>
    <div class="flex flex-wrap relative my-5">
        <div v-for="pro in updateProducts" :key="pro.id" class="w-1/2 md:w-1/4 py-4 mb-4 border-b border-zinc-200 hover:shadow-[0_0_6px_0_rgba(1,1,1,0.3)]">
            <div class="mb-2 px-6">              
                <NuxtLink v-if="pro.categorySlug" :to="`/categories/${pro.categorySlug}`" class="text-xs">{{ pro.categoryName }}</NuxtLink>
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
                        <NuxtLink v-if="pro.slug"
                        :to="`/product/${pro.slug}`" 
                        class="btn text-black bg-primary py-1.5 px-4 rounded-md hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)] hover:-translate-y-1 duration-300 mt-6"
                        >
                            See Details
                        </NuxtLink>
                    </div>
                </div>
                <div class="mt-2">
                    <NuxtLink v-if="pro.slug" :to="`/product/${pro.slug}`">
                        <div class="text-xs lg:text-sm text-[#167000] hover:text-[#104f00] font-bold line-clamp-2">{{ pro.title }}</div>
                    </NuxtLink>
                    <div class="text-xs line-clamp-2 my-5" v-html="changeCharacter(pro.summary)"></div>         
                </div>
            </div>
            <div class="flex justify-between items-end products-end mt-3 px-6">
                <div class="text-base lg:text-xl">${{ formatPrice(pro.minPrice) }}</div>     
            </div>
        </div>   
        <ModalPages v-if="showQuickView" @close="showQuickView = false">
            <template #body>
                <ModalPopupProductQuickView 
                :products="productData" 
                :cateTitle="productData?.categoryName" 
                />
            </template>           
        </ModalPages>
    </div>
</template>

<script setup lang="ts">
    import { type Product } from 'types/productTypes';

    //show modal
    const showQuickView = ref(false);
    const productData = ref<Product | null>(null);
    const openShowQuickView = (proData: Product) => {
        productData.value = proData;
        showQuickView.value = true;
    };

    //xử lý giá
    const formatPrice = (price: number): string => {
        return price % 1 === 0 ? `${price}.00` : price.toFixed(2);
    };

    const data = defineProps<{
        dataProduct?: Product[];
    }>();

    const changeCharacter = (value: string): string => {
        return value
        .replace(/\n+/g, '<br>')     // Gộp tất cả \n liên tiếp thành 1 <br>
        .replace(/(<br>\s*){2,}/g, '<br>'); // Gộp nhiều <br> liên tiếp thành 1
    };

    //-------------------------API----------------------------//

    const cateStore = useCateStore();

    const updateProducts = computed(() => {
        if (!data.dataProduct) return [];
        return data.dataProduct?.map((pro) => {
            const matchingCategory = cateStore.flatCategories .find((cate) => cate.id === pro.categoryId);
            return {
                ...pro,
                categoryName: matchingCategory ? matchingCategory.name : undefined,
                categorySlug: matchingCategory ? matchingCategory.slug : undefined,
            };
        });
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
