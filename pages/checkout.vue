<template>
    <div class="container max-w-[1400px]">
        <div class="mt-0 md:mt-10">
          <ul class="flex items-center bg-zinc-100 md:bg-white pl-2 xl:pl-0">
            <li class="px-3 py-2 hover:bg-zinc-100 rounded hover:border hover:border-gray-200"><a href="/">Home</a></li>
            <li class="px-2"><i class="ec ec-arrow-right-categproes"></i></li>
            <li class="px-3 py-2 md:bg-zinc-100 hover:bg-gray-200 rounded md:border md:border-gray-100"><a href="/checkout">Checkout</a></li>
          </ul>
        </div>

        <div class="container my-10">
            <h1 class="text-center text-4xl font-normal pb-10">Checkout</h1>
            <form >
                <div class="flex flex-wrap">
                    <!-- address -->
                    <div class="w-full xl:w-3/5 px-4">
                        <div class="border-b border-gray-300 mb-10">
                            <h3 class="text-2xl pb-2">Billing address</h3>
                        </div>                      
                        <BodyCheckoutAddressForm />

                        <div class="border-b border-gray-300 mb-10">
                            <h3 class="text-2xl pb-2">Shipping address</h3>
                        </div>
                        <!-- different address -->
                        <div class="px-4 pb-10 flex flex-wrap items-center">                   
                            <div class="w-full">
                                <input v-model="showForm" id="difAddres" type="checkbox" class="accent-[#169100]">                    
                                <label for="difAddres" class="font-bold ml-2">Ship to a different address?</label>
                            </div>                                           
                        </div>   

                        <div v-if="showForm">
                            <BodyCheckoutAddressForm />    
                        </div>

                        <!-- message -->
                        <div class="w-full px-4 pb-5">
                            <label for="message" class="font-bold">Order notes (optional)</label>
                            <textarea id="message" rows="4" placeholder="Tell us something more than you want about this order"
                                class="mt-2.5 p-8 border rounded-2xl w-full shadow-sm border-gray-300
                                focus:outline-none focus:border-blue-300 disabled:bg-zinc-50 disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                            ></textarea>
                        </div>     
                    </div>    
                    
                    <!-- invoice -->
                    <div class="w-full xl:w-2/5 px-4">
                        <div class="bg-[#f5f5f5] px-8 py-6 rounded-lg border border-gray-300">
                            <div class="border-b border-gray-300 mb-10">
                                <h3 class="text-2xl pb-2">Your invoice</h3>
                            </div>
                            <BodyCheckoutInvoiceForm/>
                            <BodyCheckoutPaymentMethod/>
                            <div class="px-4 pb-2 flex flex-wrap items-center my-5">                   
                                <div class="w-full flex items-start">
                                    <input id="receiveEmail" type="checkbox" class="accent-[#169100] mt-1">                    
                                    <label for="receiveEmail" class="font-bold ml-2">Yes, I would like to receive emails about special promotions, events and exclusive offers.</label>
                                </div>                                           
                            </div> 
                            <div class="px-4 pb-5 flex flex-wrap items-center my-5">                   
                                <div class="w-full flex items-start">
                                    <input id="conditions" type="checkbox" class="accent-[#169100] mt-1">                    
                                    <label for="conditions" class="font-bold ml-2">I have read and agree to the website <span class="text-[#169100]">Terms And Conditions</span><span class="text-red-500"> *</span></label>
                                </div>                                           
                            </div> 
                            <button class="btn p-4 bg-primary w-full text-xl font-bold rounded-full hover:bg-gray-700 hover:text-white mb-6">
                                Place order
                            </button>
                        </div>                      
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
    const showForm = ref(false);
</script>

<style lang="css" scoped>
    .border-b::after {
        content: ' ';
        height: 2px;
        width: 114px;
        display: block;
        background-color: #20d600;
        position: relative;
        bottom: -1px;
        left: 0;
    }
</style>