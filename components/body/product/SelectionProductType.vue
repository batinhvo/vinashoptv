<template>
    <div class="p-8 border-2 border-neutral-300 rounded-2xl">
        <!-- Info -->
        <div class="border-b border-gray-300 pb-2">
            <span>Availability: </span>
            <span class="text-[#5cb85c] font-bold">10000 in stock</span>
        </div>
        <div class="flex items-end my-5">                           
            <div class="text-4xl text-red-500">$99.00</div>       
            <div class="text-lg line-through pl-3">$139.00</div>                     
        </div>

        <!-- Type -->
        <div v-for="(values, key) in options" :key="key" class="flex flex-wrap mb-4">
            <div class="w-1/3">
                <span class="font-bold">{{ key }}</span>
            </div>
            <div class="w-2/3">
                <button
                    v-for="(val, index) in values" :key="index"
                    :class="[
                        'border border-gray-200 py-1 px-2 hover:shadow-inner hover:border-[#5cb85c] hover:text-[#228322]',
                        selectedOptions[key] === val ? 'bg-[#5cb85c] text-white' : ''
                    ]"
                    @click="selectOption(key, val)">
                    {{ val }}
                </button>
            </div>
        </div>

        <!-- Quantity -->
        <div class="mt-6 flex justify-between">
            <div class="font-bold">Quantity</div>
            <div class="flex">
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
        <div class="mt-2">
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
    // quantity
    const quantity = ref(1);
    const increment = () => {
        quantity.value++;
    };
    const decrement = () => {
        if (quantity.value > 0) quantity.value--;
    };

    //TYPE
    const options = ref({
        // Color: ['Black', 'White', 'Dark Brows', 'Highlight'],
        // Size: ['Small', 'Medium', 'Large'],
        Material: ['Cotton', 'Silk', 'Wool']
    });

    // Track selected options
    const selectedOptions = ref<Record<string, string>>({
        Color: '',
        Size: '',
        Material: ''
    });

    // Function to handle option selection
    const selectOption = (key: string, val: string) => {
        selectedOptions.value[key] = val;
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