<template>
    <div class="pt-5 border-t-2 border-gray-300">
        <div>
            <div class="flex items-center p-4 border-b border-gray-300">
                <input 
                    type="radio" 
                    name="payment" 
                    value="paypal"
                    v-model="selectedPayment"                                                          
                    class="accent-[#169100] w-4 h-4" >
                <label class="font-bold ml-3">PayPal <span class="text-[#167000]">What Is PayPal?</span></label>
            </div>
            <div v-show="selectedPayment === 'paypal'" class="p-6 bg-gray-100 border-b border-gray-300">
                <span>Pay via PayPal; you can pay with your credit card if you don’t have a PayPal account.</span>
            </div>
        </div>  
        <div>
            <div class="flex items-center p-4 border-b border-gray-300">
                <input 
                    type="radio" 
                    name="payment" 
                    value="creditcard"
                    v-model="selectedPayment"                                                          
                    class="accent-[#169100] w-4 h-4" >
                <label class="font-bold ml-3">Credit Card</label>
            </div>
            <div v-show="selectedPayment === 'creditcard'" class="p-6 bg-gray-100">
                <!-- select card -->
                <div class="mb-10">
                    <label class="font-bold">Select your credit card<span class="text-red-500"> *</span></label>
                    <BodyCheckoutInputSelect
                    :options="creditcardOpt"
                    :defaultOption="creditCardSelected"
                    @update:selectedOption="setCard"/>
                </div>
                <!-- name card -->
                <div class="mb-1">
                    <div class="w-full pb-10">
                        <label for="nameCard" class="font-bold">Name On Card<span class="text-red-500"> *</span></label>
                        <input id="nameCard" type="text" 
                        class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm appearance-none focus:outline-none focus:border-blue-300 disabled:bg-zinc-50
                        disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                        >                   
                        <p class="text-red-600 text-xs text-left pl-6"></p>
                    </div>     
                </div>
                <!-- card number -->
                <div class="mb-1">
                    <div class="w-full pb-10">
                        <label for="nameCard" class="font-bold">Card Number<span class="text-red-500"> *</span></label>
                        <input id="nameCard" type="number" placeholder="0000-0000-0000-0000"
                        class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm appearance-none focus:outline-none focus:border-blue-300 disabled:bg-zinc-50
                        disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                        >                   
                        <p class="text-red-600 text-xs text-left pl-6"></p>
                    </div>     
                </div>
                <!-- select month -->
                <div class="mb-10">
                    <label class="font-bold">Month Expired<span class="text-red-500"> *</span></label>
                    <BodyCheckoutInputSelect
                    :options="monthOpt"
                    :defaultOption="monthSelected"
                    @update:selectedOption="setMonth"/>
                </div>
                <!-- select year -->
                <div class="mb-10">
                    <label class="font-bold">Year Expired<span class="text-red-500"> *</span></label>
                    <BodyCheckoutInputSelect
                    :options="yearOpt"
                    :defaultOption="yearSelected"
                    @update:selectedOption="setYear"/>
                </div>
                <!-- card number -->
                <div class="mb-1">
                    <div class="w-full pb-10">
                        <label for="securCode" class="font-bold">Security code<span class="text-red-500"> *</span></label>
                        <input id="securCode" type="text" placeholder="enter security code on card"
                        class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm appearance-none focus:outline-none focus:border-blue-300 disabled:bg-zinc-50
                        disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                        >                   
                        <p class="text-red-600 text-xs text-left pl-6"></p>
                    </div>     
                </div>
            </div>
        </div>                       
    </div>
</template>

<script setup lang="ts">
    // Toggle PayPal visibility when selected
    const selectedPayment = ref<string | null>(null);

    const creditcardOpt = ['MasterCard', 'VISA', 'Discover', 'American Express', 'Amex', 'JCB', 'AstroPayCart', 'Diners Club International'];
    const monthOpt = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const yearOpt: string[] = Array.from({ length: 30 }, (_, i) => (2025 + i).toString());

    const creditCardSelected = ref('Nothing Selected');
    const monthSelected = ref('Nothing Selected');
    const yearSelected = ref('Nothing Selected');

    function setCard(cardOption: string) {
        creditCardSelected.value = cardOption;
    }
    function setMonth(monthOption: string) {
        monthSelected.value = monthOption;
    }
    function setYear(yearOption: string) {
        yearSelected.value =yearOption;
    }
    
</script>

<style lang="css" scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity 1s ease-in-out;
    }
    .fade-enter-from, .fade-leave-to {
        opacity: 0;
    }
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