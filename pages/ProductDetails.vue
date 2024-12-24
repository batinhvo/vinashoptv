<template>
    <div>
        <div>
            <NuxtImg :src="imgBanner" class="w-full" alt="" />
        </div>
        <div class="container mx-auto">
            <div class="my-0 md:my-10">
                <ul class="flex items-center bg-zinc-100 md:bg-white pl-2 xl:pl-0">
                    <li class="px-3 py-2 hover:bg-zinc-100 rounded hover:border hover:border-gray-200"><a href="/">Home</a></li>
                    <li class="px-2"><i class="ec ec-arrow-right-categproes"></i></li>
                    <li class="px-3 py-2 md:bg-zinc-100 hover:bg-gray-200 rounded md:border md:border-gray-100"><a href="bestseller">Hair Color</a></li>
                    <li class="px-2"><i class="ec ec-arrow-right-categproes"></i></li>
                    <li class="px-3 py-2 rounded"><a href="bestseller">Assanta Hair Color # 4 Minute 60g (Light Chestnut) 2 tubes x 60g</a></li>
                </ul>
            </div>         
            
            <div class="flex flex-wrap mb-6">
                <div class="w-full md:w-1/2 lg:w-5/12 px-4">
                    <NuxtImg class="w-full" src="/images/products/vinashoptv-product.jpg" />
                </div>
                <div class="w-full md:w-1/2 lg:w-4/12 px-4">
                    <div class="text-xs mb-2">Hair Color</div>
                    <div class="text-2xl">Assanta Hair Color # 4 Minute 60g (Light Chestnut) 2 tubes x 60g</div>
                    <div class="text-right mb-2 pr-3">Sold: 1000</div>
                    <p class="text-justify">
                        • Enriched with keratin, ceramide, natural ingredients (Green Tea Extract, Jojoba, Olive Oil, Aloe Vera Gel, Acorus Calamus Root Extract) and with no ammonia, it nourishes hair fibers deep within and keeps hair healthy.<br>
                        • The hair dye is natural, non-toxic, with a mild formula that does not irritate the scalp.
                    </p>
                </div>
                <div class="w-full md:w-1/2 lg:w-3/12 px-4">
                    <div class="p-8 border-2 border-neutral-300 rounded-2xl">
                        <!-- Info -->
                        <div class="border-b border-gray-300 pb-2">
                            <span>Availability: </span>
                            <span class="text-[#5cb85c] font-bold">10000 in stock</span>
                        </div>
                        <div class="flex items-end my-3">                           
                            <div class="text-4xl text-red-500">$99.00</div>       
                            <div class="text-lg line-through pl-3">$139.00</div>                     
                        </div>

                        <!-- Type -->
                        <div v-for="(values, key) in options" :key="key" class="flex flex-wrap mb-3">
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
                                <button  @click="decrement" class="w-10 h-7 text-center hover:bg-gray-300 bg-gray-100 border border-zinc-300 rounded-l-full">
                                    <span class="text-xs">
                                        <i class="fa fa-minus pb-1 text-gray-500" aria-hidden="true"></i>
                                    </span>
                                </button>
                                <input v-model="quantity" class="max-w-16 border-y border-zinc-300 text-center focus:outline-none" type="number">
                                <button @click="increment" class="w-10 h-7 text-center bg-gray-100 hover:bg-gray-300 border border-zinc-300 rounded-r-full">                                    
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
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

    const imgBanner = '/images/banner/bg-banner-01.jpg';

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
        Color: ['Black', 'White', 'Dark Brows', 'Highlight'],
        Size: ['Small', 'Medium', 'Large'],
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

