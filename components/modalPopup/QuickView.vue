<template>
    <div v-if="product" @click="closeModal" class="modal bg-black/50 w-full h-full fixed inset-0 z-50 flex justify-center items-center">       
        <div class="max-w-[420px] lg:max-w-[800px] bg-neutral-100 m-3 p-3 pb-6 rounded-lg border border-white shadow-2xl">
            <button @click="closeModal" class="w-full flex justify-end mb-2 text-base text-gray-400 hover:text-gray-600">
                <i class="fa fa-times" aria-hidden="true"></i>
            </button>
            <div v-if="isPopupPhone">
                <div class="border border-gray-200 mb-3">
                    <NuxtImg width="400px" :src="product.image" alt="Product Image"/>
                </div>                    
                <div class="px-2 pb-6">
                    <ModalPopupContentQuickView 
                        :cate="product.cate"
                        :title="product.title"
                        :desc="product.desc"
                        :price="product.price"
                        :link="product.link"
                        :sold="product.sold"
                        :disc="product.disc" 
                        :Discprice="product.Discprice"
                    />
                </div>
                <div class="text-center border-t border-gray-300">
                    <button class="btn text-black bg-primary py-1.5 px-4 rounded-md hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)] hover:-translate-y-1 duration-300 mt-6">
                        See Details
                    </button>
                </div>
            </div>

            <div v-if="!isPopupPhone">
                <div class="flex flex-wrap">
                    <div class="w-1/2 pr-3 text-center">
                        <div class="border border-gray-200">
                            <NuxtImg class="w-full" :src="product.image" alt="Product Image"/>
                        </div>
                        <button class="btn text-black bg-primary py-1.5 px-4 rounded-md hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)] hover:-translate-y-1 duration-300 mt-6">
                            See Details
                        </button>
                    </div>
                    <div class="w-1/2 px-3">
                        <ModalPopupContentQuickView 
                            :cate="product.cate"
                            :title="product.title"
                            :desc="product.desc"
                            :price="product.price"
                            :link="product.link"
                            :sold="product.sold"
                            :disc="product.disc" 
                            :Discprice="product.Discprice"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    defineProps<{
        product: {
            cate: string;
            image: string;
            title: string;
            desc: string;
            price: string;
            link: string;
            sold: string;
            disc: boolean;
            Discprice?: string;
        }
    }>();

    const emit = defineEmits(['close']);

    const closeModal = () => {
        emit('close');
    };

    const isPopupPhone = ref(true);
    const updateColumns = () => {
        if (window.innerWidth >= 840) {
            isPopupPhone.value = false;
        } else {
            isPopupPhone.value = true;
        }
    };
    onMounted(() => {
        updateColumns();
        window.addEventListener('resize', updateColumns); // listen
    });
    onBeforeUnmount(() => {
        window.removeEventListener('resize', updateColumns); // remove
    });
</script>





