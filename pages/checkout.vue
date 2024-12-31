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
            <form @submit.prevent="onSubmit">
                <div class="flex flex-wrap">
                    <!-- address -->
                    <div class="w-full xl:w-3/5 px-4">
                        <div class="border-b border-gray-300 mb-10">
                            <h3 class="text-2xl pb-2">Billing address</h3>
                        </div>                      
                        <div class="flex flex-wrap">
                            <!-- first name -->
                            <div class="w-full md:w-1/2 px-4 pb-10">
                                <label for="firstName" class="font-bold">First Name<span class="text-red-500"> *</span></label>
                                <input v-model="formData.firstName" id="firstName" type="text" placeholder="enter your first name"
                                    class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm focus:outline-none focus:border-blue-300 disabled:bg-zinc-50 disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                                    :class="[errors.firstName? 'border-red-500' : 'border-gray-300']">
                                <p class="text-red-600 text-xs text-left pl-6" v-if="errors.firstName">{{ errors.firstName }}</p>
                            </div>              

                            <!-- last name -->
                            <div class="w-full md:w-1/2 px-4 pb-10">
                                <label for="lastName" class="font-bold">Last Name<span class="text-red-500"> *</span></label>
                                <input v-model="formData.lastName" id="lastName" type="text" placeholder="enter your last name"
                                    class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm focus:outline-none focus:border-blue-300 disabled:bg-zinc-50 disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                                    :class="[errors.lastName? 'border-red-500' : 'border-gray-300']">
                                <p class="text-red-600 text-xs text-left pl-6" v-if="errors.lastName">{{ errors.lastName }}</p>
                            </div>        
                            
                            <!-- State -->
                            <div class="w-full px-4 pb-10">
                                <label for="state" class="font-bold">State<span class="text-red-500"> *</span></label>
                                <select v-model="formData.state" id="state" type="text" placeholder="Select State"
                                class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm appearance-none focus:outline-none focus:border-blue-300 disabled:bg-zinc-50
                                disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                                :class="[errors.state? 'border-red-500' : 'border-gray-300']">
                                    <option>123</option>
                                    <option>123</option>
                                </select>                   
                                <p class="text-red-600 text-xs text-left pl-6" v-if="errors.state">{{ errors.state }}</p>
                            </div>     

                            <!-- City -->
                            <div class="w-full md:w-1/2 px-4 pb-10">
                                <label for="city" class="font-bold">City<span class="text-red-500"> *</span></label>
                                <input v-model="formData.city" id="city" type="text" placeholder="Select City"
                                class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm focus:outline-none focus:border-blue-300 disabled:bg-zinc-50 
                                disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                                :class="[errors.city? 'border-red-500' : 'border-gray-300']">
                                <p class="text-red-600 text-xs text-left pl-6" v-if="errors.city">{{ errors.city }}</p>
                            </div>              

                            <!-- PostCode/Zip -->
                            <div class="w-full md:w-1/2 px-4 pb-10">
                                <label for="postCode" class="font-bold">PostCode/Zip<span class="text-red-500"> *</span></label>
                                <input v-model="formData.postCode" id="postCode" type="text" placeholder="9999"
                                class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm focus:outline-none focus:border-blue-300 disabled:bg-zinc-50 
                                disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                                :class="[errors.postCode? 'border-red-500' : 'border-gray-300']">
                                <p class="text-red-600 text-xs text-left pl-6" v-if="errors.postCode">{{ errors.postCode }}</p>
                            </div>     
                            
                            <!-- Street Address -->
                            <div class="w-full px-4 pb-10">
                                <label for="address" class="font-bold">Strees Address<span class="text-red-500"> *</span></label>
                                <input v-model="formData.address" id="address" type="text" placeholder="enter your address"
                                class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm appearance-none focus:outline-none focus:border-blue-300 disabled:bg-zinc-50
                                disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                                :class="[errors.address? 'border-red-500' : 'border-gray-300']">                   
                                <p class="text-red-600 text-xs text-left pl-6" v-if="errors.address">{{ errors.address }}</p>
                            </div>     

                            <!-- email -->
                            <div class="w-full md:w-1/2 px-4 pb-10">
                                <label for="email" class="font-bold">Email Address<span class="text-red-500"> *</span></label>
                                <input v-model="formData.email" id="email" type="email" placeholder="enter your email address"
                                class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm focus:outline-none focus:border-blue-300 disabled:bg-zinc-50 
                                disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                                :class="[errors.email? 'border-red-500' : 'border-gray-300']">
                                <p class="text-red-600 text-xs text-left pl-6" v-if="errors.email">{{ errors.email }}</p>
                            </div>        

                            <!-- phone -->
                            <div class="w-full md:w-1/2 px-4 pb-10">
                                <label for="phone" class="font-bold">Phone<span class="text-red-500"> *</span></label>
                                <input v-model="formData.phone" id="phone" type="text" placeholder="enter your phone"
                                class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm focus:outline-none focus:border-blue-300 disabled:bg-zinc-50 disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                                :class="[errors.phone? 'border-red-500' : 'border-gray-300']">
                                <p class="text-red-600 text-xs text-left pl-6" v-if="errors.phone">{{ errors.phone }}</p>
                            </div>       
                        </div>

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
                            <div class="flex flex-wrap">
                                <!-- first name -->
                                <div class="w-full md:w-1/2 px-4 pb-10">
                                    <label for="firstNameDif" class="font-bold">First Name<span class="text-red-500"> *</span></label>
                                    <input v-model="formData.firstNameDif" id="firstNameDif" type="text" placeholder="enter your first name"
                                        class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm focus:outline-none focus:border-blue-300 disabled:bg-zinc-50 disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                                        :class="[errors.firstNameDif? 'border-red-500' : 'border-gray-300']">
                                    <p class="text-red-600 text-xs text-left pl-6" v-if="errors.firstNameDif">{{ errors.firstNameDif }}</p>
                                </div>              

                                <!-- last name -->
                                <div class="w-full md:w-1/2 px-4 pb-10">
                                    <label for="lastNameDif" class="font-bold">Last Name<span class="text-red-500"> *</span></label>
                                    <input v-model="formData.lastNameDif" id="lastNameDif" type="text" placeholder="enter your last name"
                                        class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm focus:outline-none focus:border-blue-300 disabled:bg-zinc-50 disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                                        :class="[errors.lastNameDif? 'border-red-500' : 'border-gray-300']">
                                    <p class="text-red-600 text-xs text-left pl-6" v-if="errors.lastNameDif">{{ errors.lastNameDif }}</p>
                                </div>        
                                
                                <!-- State -->
                                <div class="w-full px-4 pb-10">
                                    <label for="stateDif" class="font-bold">State<span class="text-red-500"> *</span></label>
                                    <select v-model="formData.stateDif" id="stateDif" type="text" placeholder="Select State"
                                    class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm appearance-none focus:outline-none focus:border-blue-300 disabled:bg-zinc-50
                                    disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                                    :class="[errors.stateDif? 'border-red-500' : 'border-gray-300']">
                                        <option>123</option>
                                        <option>123</option>
                                    </select>                   
                                    <p class="text-red-600 text-xs text-left pl-6" v-if="errors.stateDif">{{ errors.stateDif }}</p>
                                </div>     

                                <!-- City -->
                                <div class="w-full md:w-1/2 px-4 pb-10">
                                    <label for="cityDif" class="font-bold">City<span class="text-red-500"> *</span></label>
                                    <input v-model="formData.cityDif" id="cityDif" type="text" placeholder="Select City"
                                    class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm focus:outline-none focus:border-blue-300 disabled:bg-zinc-50 
                                    disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                                    :class="[errors.cityDif? 'border-red-500' : 'border-gray-300']">
                                    <p class="text-red-600 text-xs text-left pl-6" v-if="errors.cityDif">{{ errors.cityDif }}</p>
                                </div>              

                                <!-- PostCode/Zip -->
                                <div class="w-full md:w-1/2 px-4 pb-10">
                                    <label for="postCodeDif" class="font-bold">PostCode/Zip<span class="text-red-500"> *</span></label>
                                    <input v-model="formData.postCodeDif" id="postCodeDif" type="text" placeholder="9999"
                                    class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm focus:outline-none focus:border-blue-300 disabled:bg-zinc-50 
                                    disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                                    :class="[errors.postCodeDif? 'border-red-500' : 'border-gray-300']">
                                    <p class="text-red-600 text-xs text-left pl-6" v-if="errors.postCodeDif">{{ errors.postCodeDif }}</p>
                                </div>     
                                
                                <!-- Street Address -->
                                <div class="w-full px-4 pb-10">
                                    <label for="addressDif" class="font-bold">Strees Address<span class="text-red-500"> *</span></label>
                                    <input v-model="formData.addressDif" id="addressDif" type="text" placeholder="enter your address"
                                    class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm appearance-none focus:outline-none focus:border-blue-300 disabled:bg-zinc-50
                                    disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                                    :class="[errors.addressDif? 'border-red-500' : 'border-gray-300']">                   
                                    <p class="text-red-600 text-xs text-left pl-6" v-if="errors.addressDif">{{ errors.addressDif }}</p>
                                </div>     

                                <!-- email -->
                                <div class="w-full md:w-1/2 px-4 pb-10">
                                    <label for="emailDif" class="font-bold">Email Address<span class="text-red-500"> *</span></label>
                                    <input v-model="formData.emailDif" id="emailDif" type="email" placeholder="enter your email address"
                                    class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm focus:outline-none focus:border-blue-300 disabled:bg-zinc-50 
                                    disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                                    :class="[errors.emailDif? 'border-red-500' : 'border-gray-300']">
                                    <p class="text-red-600 text-xs text-left pl-6" v-if="errors.emailDif">{{ errors.emailDif }}</p>
                                </div>        

                                <!-- phone -->
                                <div class="w-full md:w-1/2 px-4 pb-10">
                                    <label for="phoneDif" class="font-bold">Phone<span class="text-red-500"> *</span></label>
                                    <input v-model="formData.phoneDif" id="phoneDif" type="text" placeholder="enter your phone"
                                    class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm focus:outline-none focus:border-blue-300 disabled:bg-zinc-50 disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                                    :class="[errors.phoneDif? 'border-red-500' : 'border-gray-300']">
                                    <p class="text-red-600 text-xs text-left pl-6" v-if="errors.phoneDif">{{ errors.phoneDif }}</p>
                                </div>       
                            </div>   
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
    const { formData, errors, isSubmitting, onSubmit } = useformContact();
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