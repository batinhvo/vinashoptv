<template>
    <div class="flex flex-wrap relative my-5">
        <div v-for="(pro, index) in productStore.products" :key="pro.id" class="w-1/2 md:w-1/4 py-4 mb-4 hover:shadow-[0_0_6px_0_rgba(1,1,1,0.3)]">
            <div class="mb-2 px-6">
                <NuxtLink class="text-xs">{{ cateTitle }}</NuxtLink>
            </div>
            <div class="px-6 border-x border-zinc-100">
                <div class="relative group">
                    <button @click="openShowQuickView">
                        <NuxtImg class="w-full" :src="proImg" :alt="pro.title"  crossorigin="anonymous"/>
                        
                    </button>
                    
                    <div class="pop-up">
                        <button class="btn text-black bg-primary py-1.5 px-4 rounded-md hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)] hover:-translate-y-1 duration-300"
                            @click="openShowQuickView">
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
                
                <!-- <div class="text-base lg:text-xl" :class="[pro.minPrice ? 'text-red-500': '']">${{ pro.minPrice ? pro.minPrice : pro.minPrice }}</div>           
                <div v-if="product.disc && product.discPrice" class="text-xs lg:text-base line-through">${{ product.price }}.00</div> -->
            </div>
        </div>   
    
        <ModalPages v-if="showQuickView" @close="showQuickView = false">
            <template #body>
                <ModalPopupProductQuickView />
            </template>           
        </ModalPages>
    </div>
</template>

<script setup lang="ts">

    //show modal
    const showQuickView = ref(false);
    const openShowQuickView = () => {
        showQuickView.value = true;
    };

    const props = defineProps<{
        cateTitle: string;
    }>();

    const proImg = ref('')
    
    //-----------------------API-----------------------------//
    const productStore = useProductStore();
    await productStore.fetchProducts();

    const codeImg = encodeURIComponent('upload/2024/12/product/75a41e81-b94f-48f5-b80b-4027d5f8bc99.jpeg');

    const imgProductStore = useImagesProduct();
    
    await imgProductStore.fetchImagesProduct(codeImg);
    proImg.value = imgProductStore.dataImg
    
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