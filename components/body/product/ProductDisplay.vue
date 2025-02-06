<template>
    <div class="flex flex-wrap relative my-5">
        <div v-for="(product, index) in products" :key="product.id" class="w-1/2 md:w-1/4 py-4 mb-4 hover:shadow-[0_0_6px_0_rgba(1,1,1,0.3)]">
            <div class="mb-2 px-6">
                <NuxtLink class="text-xs">{{ product.cate }}</NuxtLink>
            </div>
            <div :class="['px-6', { 'border-l border-gray-200': index % columns !== 0 }]">
                <div class="relative group">
                    <button @click="openShowQuickView">
                        <NuxtImg class="w-full" :src="product.image" :alt="product.title"/>
                    </button>
                    <div class="pop-up">
                        <button class="btn text-black bg-primary py-1.5 px-4 rounded-md hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)] hover:-translate-y-1 duration-300"
                            @click="openShowQuickView">
                            Quick View
                        </button>                                              
                        <NuxtLink
                        :to="`/product/${generateSlug(product.title)}`"
                        class="btn text-black bg-primary py-1.5 px-4 rounded-md hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)] hover:-translate-y-1 duration-300 mt-6"
                        >
                            See Details
                        </NuxtLink>
                    </div>
                </div>
                <div class="mt-2">
                    <NuxtLink :to="`/product/${generateSlug(product.title)}`">
                        <div class="text-xs lg:text-sm text-[#167000] hover:text-[#104f00] font-bold line-clamp-2">{{ product.title }}</div>
                    </NuxtLink>
                    <div class="text-xs line-clamp-2 my-5">{{ product.desc }}</div>         
                </div>
            </div>
            <div class="flex justify-between items-end products-end mt-3 px-6">
                <div class="text-base lg:text-xl" :class="[product.disc ? 'text-red-500': '']">${{ product.disc ? product.discPrice : product.price }}.00</div>                
                <div v-if="product.disc && product.discPrice" class="text-xs lg:text-base line-through">${{ product.price }}.00</div>
            </div>
        </div>   
    
        <Modal v-if="showQuickView" @close="showQuickView = false">
            <template #body>
                <ModalPopupProductQuickView />
            </template>           
        </Modal>
    </div>
</template>

<script setup lang="ts">

    //show modal
    const showQuickView = ref(false);
    const openShowQuickView = () => {
        showQuickView.value = true;
    };

    // -----------------border product----------------------- //
    const columns = ref(2);
    const updateColumns = () => {
        if (window.innerWidth >= 768) {
            columns.value = 4;
        } else {
            columns.value = 2;
        }
    };

    //----------------Call-Quick-View-------------------//
    type Product = {
        id: string,
        cate: string;
        image: string;
        title: string;
        desc: string;
        price: string;
        sold: string;
        disc: boolean;
        discPrice?: string;
        subImages: boolean;
        thumImages?: string[];
    };


    //data
    const products: Product[] = [
        {
            id: '001',
            cate : 'Hair Color',
            image: '/images/products/vinashoptv-product.jpg',
            title: 'Assanta Hair Color # 4 Minute 60g (Light Chestnut) 2 tubes x 60g',           
            desc : 'Enriched with keratin, ceramide, natural ingredients (Green Tea Extract, Jojoba, Olive Oil, Aloe Vera Gel, Acorus Calamus Root Extract) and with no ammonia, it nourishes hair fibers deep within and keeps hair healthy.',           
            price : '139',           
            sold : '1000',
            disc : true,
            discPrice : '99',
            subImages : true,
            thumImages : [
                '/images/products/vinashoptv-product.jpg',
                '/images/products/vinashoptv-product.jpg',
                '/images/products/vinashoptv-product.jpg',
            ]
        },       
    ];

    //link
    const generateSlug = (name: string): string =>
    name.toLowerCase().replace(/\s+/g, '-');


    //-----------------------API-----------------------------//
    const productStore = useProductStore();

    onMounted(async () => {
        await productStore.fetchProducts;
        console.log(productStore.products)
    });

    onMounted(() => {
        updateColumns();
        window.addEventListener('resize', updateColumns); // listen
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', updateColumns); // remove
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