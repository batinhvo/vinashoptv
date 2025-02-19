<template>
    <div class="p-8 border-2 border-neutral-300 rounded-2xl" v-if="data.dataPro">
        <!-- Info -->
        <div class="border-b border-gray-300 pb-2">
            <span>Availability: </span>
            <span class="text-[#5cb85c] font-bold">{{ data.dataPro.totalOutFake }} in stock</span>
        </div>

        <!-- Price -->
        <div v-if="dataSkusfilter" class="flex items-end my-5">                           
            <div class="text-4xl text-red-500">${{ formatPrice(dataSkusfilter.price) }}</div>       
            <div v-if="dataSkusfilter.salePrice" class="text-lg line-through pl-3">${{ formatPrice(dataSkusfilter.salePrice) }}</div>                     
        </div>
        <div v-else class="flex items-end my-5">                           
            <div class="text-4xl">${{ formatPrice(data.dataPro.minPrice) }}</div>                 
        </div>

        <!-- Type -->
        <div v-for="vari in dataVariant" :key="vari.id" class="flex flex-wrap mb-4">
            <div class="w-1/3">
                <span class="font-bold">{{ vari.name }}</span>
            </div>
            <div class="w-2/3">
                <button
                    v-for="varOpt in vari.options" :key="varOpt.id"
                    class="border border-gray-200 py-1 px-2 hover:shadow-inner hover:border-[#5cb85c] lg:hover:text-[#228322]"
                    :class="[selectedOptions[vari.name] === varOpt.name ? 'bg-[#5cb85c] text-white' : '']"
                    @click="selectOption(vari.name, varOpt.name, varOpt.id)">
                    {{ varOpt.name }}
                </button>
            </div>
        </div>

        <!-- Quantity -->
        <div class="mt-6 flex flex-wrap">
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
        <div class="mt-2" v-if="isShowButton">
            <button type="submit" class="btn bg-primary text-white py-2.5 w-full mt-4 rounded-full font-bold shadow-sm hover:bg-gray-700 hover:shadow-xl hover:-translate-y-1 duration-300">
                <span class="text-xl"><i class="ec ec-add-to-cart mr-2"></i></span>                              
                Add to Cart
            </button>
            <button type="submit" class="btn bg-gray-700 text-white py-3 w-full mt-4 rounded-full font-bold shadow-sm hover:shadow-xl hover:-translate-y-1 duration-300">
                Buy Now
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { ProductDetails, Variant, Skus } from "types/productDetailTypes";

    const isShowButton = ref(false);
    // quantity
    const quantity = ref(1);
    const increment = () => { quantity.value++ };
    const decrement = () => { 
        if (quantity.value > 1) quantity.value--;
    };
    const formatPrice = (price: number): string => {
        return price % 1 === 0 ? `${price}.00` : price.toFixed(2);
    };

    ////////////////////////////////////////////////////////////
    
    const dataVariant = ref<Variant[]>([]);
    const dataSkus = ref<Skus[]>([]);
    const selectedOptions = ref<Record<string, string>>({});
    const dataSkusfilter = ref<Skus | null>(null);

    const data = defineProps<{
        dataPro?: ProductDetails;
    }>();

    dataVariant.value = data.dataPro?.variants || [];
    dataSkus.value = data.dataPro?.skus || [];

    const selectOption = (key: string, val: string, id: number) => {
        isShowButton.value = true;
        selectedOptions.value = { ...selectedOptions.value, [key]: val };
       
        dataSkusfilter.value = dataSkus.value.find((sku) => sku.variantOptionIds === id.toString()) || null;
    };
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
</style>