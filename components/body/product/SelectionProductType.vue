<template>
    <div class="p-8 bg-[#def5dd] border-2 border-gray-200 rounded-2xl" v-if="data.dataPro">
        <!-- Info -->
        <div class="border-b border-gray-300 pb-2">
            <span>Availability: </span>
            <span v-if="isOutOfStock" class="text-gray-500 font-bold">Out of stock</span>
            <span v-else class="text-[#5cb85c] font-bold">{{ stockData }} in stock</span>
        </div>

        <!-- Price -->
        <div v-if="dataSkusfilter" class="flex items-end my-5">                           
            <div class="text-3xl sm:text-4xl"
            :class="{ 'text-red-500': dataSkusfilter.salePrice && dataSkusfilter.salePrice !== dataSkusfilter.price }">
                ${{ formatPrice(dataSkusfilter.salePrice) }}
            </div>      
            <div v-if="dataSkusfilter.salePrice && (dataSkusfilter.salePrice !== dataSkusfilter.price)" 
            class="text-lg line-through pl-3">
                ${{ formatPrice(dataSkusfilter.price) }}
            </div>                     
        </div>
        <div v-else class="flex items-end my-5">                           
            <div class="text-4xl">${{ formatPrice(data.dataPro.minPrice) }}</div>                 
        </div>

        <!-- Type -->
        <div v-for="vari in dataVariant" :key="vari.id">
            <div class="flex flex-wrap mb-4" v-if="vari.name !== 'default'">
                <div class="w-1/3" >
                    <span class="font-bold">{{ vari.name }}</span>
                </div>
                <div class="w-2/3">
                    <button
                        v-for="varOpt in vari.options" :key="varOpt.id"
                        class="border m-0.5 border-[#bed2bd] shadow-sm py-1 px-2 text-left hover:shadow-inner hover:border-[#5cb85c] lg:hover:text-[#228322]"
                        :class="[selectedOptions[vari.name]?.val === varOpt.name ? 'bg-[#5cb85c] text-white' : '']"
                        @click="selectOption(vari.name, varOpt.name, varOpt.id)">
                        {{ varOpt.name }}
                    </button>
                </div>       
            </div>            
        </div>

        <!-- Quantity -->
        <div class="mt-6 flex flex-wrap" v-if="isShowButton">
            <div class="font-bold w-1/3">Quantity</div>
            <div class="flex w-2/3">
                <button  @click.prevent="decrement" class="w-10 h-7 text-center hover:bg-gray-300 bg-gray-100 border border-zinc-300 rounded-l-full">
                    <span class="text-xs">
                        <i class="fa fa-minus pb-1 text-gray-500" aria-hidden="true"></i>
                    </span>
                </button>
                <input v-model="quantity" class="max-w-16 border-y border-zinc-300 text-center focus:outline-none" type="number">
                <button @click.prevent="increment" class="w-10 h-7 text-center bg-gray-100 hover:bg-gray-300 border border-zinc-300 rounded-r-full">                                    
                    <span class="text-xs">
                        <i class="fa fa-plus pb-1 text-gray-500" aria-hidden="true"></i>
                    </span>
                </button>               
            </div>
        </div>

        <!-- button -->
        <div class="mt-2" v-if="isShowButton && !isOutOfStock">

            <button
            type="button"
            class="btn bg-primary text-white py-3 w-full mt-4 rounded-full font-bold shadow-sm hover:bg-gray-700 hover:shadow-xl hover:-translate-y-1 duration-300"
            :disabled="loading"
            @click="handleAddTocartButton">
                <span class="flex items-center justify-center gap-2">
                    <span v-if="loading" class="spinner"></span>
                    <i v-else class="text-xl ec ec-add-to-cart mr-2"></i>
                    {{ loading ? 'Adding...' : 'Add to Cart' }}
                </span>
            </button>
            
            <button type="button" class="btn bg-gray-700 text-white py-3 w-full mt-4 rounded-full font-bold shadow-sm hover:shadow-xl hover:-translate-y-1 duration-300"
            @click="handleBuyNowButton">
                Buy Now 
            </button>
            
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { ProductDetail, Variant, Skus } from "types/productTypes";

    const router = useRouter();
    const cartStore = useCartStore();

    // --- Props & Emits --- //
    const data = defineProps<{
        dataPro?: ProductDetail;
        dataVariant?: Variant[];
    }>();

    const emit = defineEmits(["updateSlideImages"]);

    // --- Ref --- //
    const loading = ref(false);
    const isShowButton = ref(false);
    const isOutOfStock = ref(false);
    const stockData = ref(0);
    const idSkus = ref(0);

    const quantity = ref(1);
    const dataSkus = ref<Skus[]>([]);
    const dataSkusfilter = ref<Skus | null>(null);

    const selectedOptions = ref<Record<string, { val: string; id: number }>>({});
    const choiceList = ref<string>("");

    // --- Methods --- //
    const increment = () => {
        quantity.value++;
    };

    const decrement = () => {
        if (quantity.value > 1) quantity.value--;
    };

    const formatPrice = (price: number): string => {
        return price % 1 === 0 ? `${price}.00` : price.toFixed(2);
    };

    const selectOption = (key: string, val: string, id: number) => {
        selectedOptions.value = {
            ...selectedOptions.value,
            [key]: { val, id }
        };

        choiceList.value = Object.values(selectedOptions.value)
            .map((v) => v.id)
            .sort((a, b) => a - b)
            .join(",");
    };

    const updateSelectedSku = (variantOptionIds: string) => {
        const sortedIds = variantOptionIds
            .split(",")
            .map(Number)
            .sort((a, b) => a - b)
            .join(",");

        const foundSku =
            dataSkus.value.find((sku) => {
                const skuIds = sku.variantOptionIds
                    .split(",")
                    .map(Number)
                    .sort((a, b) => a - b)
                    .join(",");

                return skuIds === sortedIds;
            }) || null;

        dataSkusfilter.value = foundSku;

        if (foundSku) {
            isShowButton.value = foundSku.stock > 0;
            isOutOfStock.value = foundSku.stock <= 0;
            stockData.value = foundSku.stock;

            emit("updateSlideImages", foundSku.variantOptionIds);

            idSkus.value = Number(foundSku.id);
        } else {
            isShowButton.value = false;
            isOutOfStock.value = true;
            stockData.value = 0;
            idSkus.value = 0;
        }
    };

    // --- Actions --- //
    const handleBuyNowButton = () => {
        if (!idSkus.value) return;

        cartStore.getDataBuyNow(idSkus.value, quantity.value);
        router.push("/checkout");
    };

    const handleAddTocartButton = async () => {
        if (loading.value || !idSkus.value) return;

        try {
            loading.value = true;

            await cartStore.getDataAddCart(
                idSkus.value,
                quantity.value
            );
        } catch (error) {
            console.error(error);
        } finally {
            loading.value = false;
        }
    };

    // --- Watch --- //
    watch(choiceList, (newVal) => {
        if (!newVal) return;

        updateSelectedSku(newVal);
    });

    // --- Init --- //
    onMounted(() => {
        if (!data.dataPro?.skus?.length) return;

        dataSkus.value = data.dataPro.skus;
        
        const totalStock = dataSkus.value.reduce(
            (total, sku) => total + sku.stock,
            0
        );

        stockData.value = totalStock;
        isOutOfStock.value = totalStock <= 0;
        isShowButton.value = totalStock > 0;

        // Nếu chỉ có 1 SKU => auto chọn
        if (data.dataPro.skus.length === 1) {
            const sku = data.dataPro.skus[0];

            dataSkusfilter.value = sku;

            idSkus.value = Number(sku.id);
            stockData.value = sku.stock;

            isOutOfStock.value = sku.stock <= 0;
            isShowButton.value = true;

            emit("updateSlideImages", sku.variantOptionIds);

            return;
        }

        // Nếu product không cần chọn variant
        const hasRealVariants = data.dataVariant?.some(
            (vari) => vari.options.length > 1
        );

        if (!hasRealVariants) {
            const firstSku = data.dataPro.skus[0];

            dataSkusfilter.value = firstSku;

            idSkus.value = Number(firstSku.id);
            stockData.value = firstSku.stock;

            isOutOfStock.value = firstSku.stock <= 0;
            isShowButton.value = true;

            emit("updateSlideImages", firstSku.variantOptionIds);
        }
    });
</script>

<style lang="css" scoped>
    input[type="number"]::-webkit-inner-spin-button, 
    input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    input[type="number"] {
        -moz-appearance: textfield; /* Ẩn trên Firefox */
        appearance: none;
    }

    .spinner {
        width: 18px;
        height: 18px;
        border: 2px solid white;
        border-top: 2px solid transparent;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
    }

    .text-xl {
        font-size: 1.25rem;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
</style>