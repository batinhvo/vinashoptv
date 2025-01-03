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
                    <!----------------------------------------------------- address ----------------------------------------------------------------->
                    <div class="w-full xl:w-3/5 px-4">
                        <div class="title border-b border-gray-300 mb-10">
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

                        <div class="title border-b border-gray-300 mb-10">
                            <h3 class="text-2xl pb-2">Shipping address</h3>
                        </div>

                        <!-------------------------------------------------------------------- different address ---------------------------------------------------------------------->
                        <div class="px-4 pb-10 flex flex-wrap items-center">                   
                            <div class="w-full">
                                <input v-model="formData.isDifferentAddress" id="difAddres" type="checkbox" class="accent-[#169100]">                    
                                <label for="difAddres" class="font-bold ml-2">Ship to a different address?</label>
                            </div>                                           
                        </div>   

                        <div v-if="formData.isDifferentAddress">
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
                            <textarea v-model="formData.message" id="message" rows="4" placeholder="Tell us something more than you want about this order"
                                class="mt-2.5 p-8 border rounded-2xl w-full shadow-sm border-gray-300
                                focus:outline-none focus:border-blue-300 disabled:bg-zinc-50 disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                            ></textarea>
                        </div>     
                    </div>    
                    
                    <!-- ------------------------------------------------------------------invoice --------------------------------------------------------------------->
                    <div class="w-full xl:w-2/5 px-4">
                        <div class="bg-[#f5f5f5] px-8 py-6 rounded-lg border border-gray-300">
                            <div class="title border-b border-gray-300 mb-10">
                                <h3 class="text-2xl pb-2">Your invoice</h3>
                            </div>
                            <div class="pb-5">
                                <table class="w-full">
                                    <thead>
                                        <tr>
                                            <th class="text-left max-w-80 pb-4">Product </th>
                                            <th class="text-right pl-8 pb-4"> Total</th>
                                        </tr>
                                    </thead>
                                    <tbody class="border-t border-gray-300">                
                                        <tr v-for="(product, index) in products" :key="product.id">
                                            <td class="py-4 border-t border-gray-300">
                                                <p class="mb-1">{{ product.name }}</p>
                                                <!-- Quantity -->                       
                                                <div class="flex border border-zinc-300 rounded-full bg-white pl-5 pr-3 py-1">                           
                                                    <input v-model="product.quantity" class="w-full focus:outline-none" type="number" name="quantity">
                                                    <button   @click.prevent="decrement(index)" class="w-9 h-7 text-center hover:bg-gray-300 border border-white rounded-full">
                                                        <span class="text-xs">
                                                            <i class="fa fa-minus pb-1 text-gray-500" aria-hidden="true"></i>
                                                        </span>
                                                    </button>
                                                    <button @click.prevent="increment(index)" class="w-9 h-7 text-center hover:bg-gray-300 border border-white rounded-full">                                    
                                                        <span class="text-xs">
                                                            <i class="fa fa-plus pb-1 text-gray-500" aria-hidden="true"></i>
                                                        </span>
                                                    </button>
                                                </div>             
                                                <div class="flex items-center mt-3">
                                                    <p class="font-bold">Gift:</p>
                                                    <p class="border border-green-300 bg-green-100 rounded-lg py-0.5 px-3 ml-5">Assanta Hair Color # 5</p>
                                                    <button class="w-7 h-7 text-center hover:bg-gray-300 rounded-full ml-5">
                                                        <span class="text-xs">
                                                            <i class="fa fa-times pb-1 text-gray-500" aria-hidden="true"></i>
                                                        </span>
                                                    </button>
                                                </div>                          
                                            </td>
                                            <td class="pl-4 xl:pl-8 py-4 content-baseline text-right">
                                                ${{ product.price }}.00
                                                <button class="w-7 h-7 text-center hover:bg-gray-300 hover:border rounded-full">
                                                    <span class="text-xs">
                                                        <i class="fa fa-times pb-1 text-gray-500" aria-hidden="true"></i>
                                                    </span>
                                                </button>
                                            </td>
                                        </tr>               
                                    </tbody>
                                    <tfoot class="border-t border-gray-300 ">
                                        <tr>
                                            <th class="py-4">If you have a coupon code, please apply it below.</th>                    
                                        </tr>
                                        <tr>                   
                                            <td>
                                                <div class="flex pb-5">                           
                                                    <input class="w-full focus:outline-none p-2.5 pl-5 focus:border-blue-300 border border border-zinc-300 rounded-l-full bg-white" type="text" placeholder="Coupon Code" name="coupon">
                                                    <button class="pl-4 text-center text-white bg-gray-600 hover:shadow-xl">
                                                        Apply
                                                    </button>
                                                    <button class="px-4 text-center text-white bg-gray-600  hover:shadow-xl rounded-r-full">
                                                        Cancel
                                                    </button>
                                                </div>      
                                            </td>         
                                        </tr>
                                        <tr class="border-t border-gray-300">
                                            <th class="text-left py-3">Subtotal</th>
                                            <td class="text-right py-3">$100.00</td>
                                        </tr>
                                        <tr class="border-t border-gray-300">
                                            <th class="text-left py-3">Shipping & Handling</th>
                                            <td class="text-right py-3">$9.00</td>
                                        </tr>
                                        <tr class="border-t border-gray-300">
                                            <th class="text-left py-3">Discount</th>
                                            <td class="text-right py-3">-$9.00</td>
                                        </tr>
                                        <tr class="border-t border-gray-300">
                                            <th class="text-left py-3">Tax</th>
                                            <td class="text-right py-3">$0.00</td>
                                        </tr>
                                        <tr class="border-t border-gray-300">
                                            <th class="text-left py-3">Total</th>
                                            <th class="text-right py-3">$999.00</th>
                                        </tr>              
                                    </tfoot>
                                </table>
                            </div>

                            <!----------------------------------------------------------------- payment method --------------------------------------------------------->
                            <div class="pt-5 border-t-2 border-gray-300">
                                <div>
                                    <div class="flex items-center p-4 border-b border-gray-300">
                                        <input 
                                            type="radio" 
                                            name="payment" 
                                            value="paypal"
                                            v-model="selectedPayment"
                                            @change="onPaymentChange"                                                          
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
                                            @change="onPaymentChange"                                                        
                                            class="accent-[#169100] w-4 h-4 border" 
                                            >
                                        <label class="font-bold ml-3">Credit Card</label>
                                    </div>                                   
                                    <div v-show="selectedPayment === 'creditcard'" class="p-6 bg-gray-100">
                                        <!-- select card -->
                                        <div class="mb-10">
                                            <label class="font-bold">Select your credit card<span class="text-red-500"> *</span></label>
                                            <BodyCheckoutInputSelect                                          
                                            id="creditCard"
                                            :options="creditcardOpt"
                                            :activeDropdownId="activeDropdownId"
                                            :defaultOption="creditCardSelected"
                                            @update:selectedOption="setCard"
                                            @update:activeDropdownId="setActiveDropdownId"/>
                                            <p class="text-red-600 text-xs text-left pl-6" v-if="errors.creditCard">{{ errors.creditCard }}</p>
                                        </div>                                       
                                        <!-- name card -->
                                        <div class="mb-1">
                                            <div class="w-full pb-10">
                                                <label for="nameCard" class="font-bold">Name On Card<span class="text-red-500"> *</span></label>
                                                <input id="nameCard" type="text" v-model="formData.nameCard"
                                                class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm appearance-none focus:outline-none focus:border-blue-300 disabled:bg-zinc-50
                                                disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                                                >                   
                                                <p class="text-red-600 text-xs text-left pl-6" v-if="errors.nameCard">{{ errors.nameCard }}</p>
                                            </div>     
                                        </div>
                                        <!-- card number -->
                                        <div class="mb-1">
                                            <div class="w-full pb-10">
                                                <label for="cardNumber" class="font-bold">Card Number<span class="text-red-500"> *</span></label>
                                                <input id="cardNumber" v-model="formData.cardNumber" type="number" placeholder="0000-0000-0000-0000"
                                                class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm appearance-none focus:outline-none focus:border-blue-300 disabled:bg-zinc-50
                                                disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                                                >                   
                                                <p class="text-red-600 text-xs text-left pl-6" v-if="errors.cardNumber">{{ errors.cardNumber }}</p>
                                            </div>     
                                        </div>
                                        <!-- select month -->
                                        <div class="mb-10">
                                            <label class="font-bold">Month Expired<span class="text-red-500"> *</span></label>
                                            <BodyCheckoutInputSelect
                                            id="month"
                                            :options="monthOpt"
                                            :activeDropdownId="activeDropdownId"
                                            :defaultOption="monthSelected"
                                            @update:selectedOption="setMonth"
                                            @update:activeDropdownId="setActiveDropdownId"/>
                                            <p class="text-red-600 text-xs text-left pl-6" v-if="errors.monthCard">{{ errors.monthCard }}</p>
                                        </div>
                                        <!-- select year -->
                                        <div class="mb-10">
                                            <label class="font-bold">Year Expired<span class="text-red-500"> *</span></label>
                                            <BodyCheckoutInputSelect
                                            id="year"
                                            :options="yearOpt"
                                            :activeDropdownId="activeDropdownId"
                                            :defaultOption="yearSelected"
                                            @update:selectedOption="setYear"
                                            @update:activeDropdownId="setActiveDropdownId"/>
                                            <p class="text-red-600 text-xs text-left pl-6" v-if="errors.yearCard">{{ errors.yearCard }}</p>
                                        </div>
                                        <!-- security code -->
                                        <div class="mb-1">
                                            <div class="w-full pb-10">
                                                <label for="securCode" class="font-bold">Security code<span class="text-red-500"> *</span></label>
                                                <input v-model="formData.securityCode" id="securCode" type="text" placeholder="enter security code on card"
                                                class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm appearance-none focus:outline-none focus:border-blue-300 disabled:bg-zinc-50
                                                disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                                                >                   
                                                <p class="text-red-600 text-xs text-left pl-6" v-if="errors.securityCode">{{ errors.securityCode }}</p>
                                            </div>     
                                        </div>
                                    </div>
                                </div>                       
                            </div>
                            <div class="px-4 pb-2 flex flex-wrap items-center my-5">                   
                                <div class="w-full flex items-start">
                                    <input v-model="formData.receiveEmail" id="receiveEmail" type="checkbox" class="accent-[#169100] mt-1">                    
                                    <label for="receiveEmail" class="font-bold ml-2">Yes, I would like to receive emails about special promotions, events and exclusive offers.</label>
                                </div>                                           
                            </div> 
                            <div class="px-4 pb-5 flex flex-wrap items-center my-5">                   
                                <div class="w-full flex items-start">
                                    <input v-model="formData.agree" id="conditions" type="checkbox" class="accent-[#169100] mt-1" checked>                    
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
    //-----------------------------SUBMIT------------------------------------------------//
    const { formData, errors, isSubmitting, onSubmit } = useformCheckout();

    //----------------------------INVOICE FORM-----------------------------------//
    const products = ref([
        { id: '01', name: 'Assanta Hair Color # 4 Minute 60g (Light Chestnut) 2 tubes x 60g - default', price: 139, quantity: 1 },
        { id: '02', name: 'Assanta Hair Color # 4 Minute 60g (Light Chestnut) 2 tubes x 60g - default', price: 99, quantity: 1 }
    ]);
    // quantity
    const increment = (index: number) => {
        products.value[index].quantity++;
    };
    const decrement = (index: number) => {
        if (products.value[index].quantity > 1) {  
            products.value[index].quantity--;
        }
    };

    //---------------------------------PAYMENT METHOD-------------------------------------------//
    // Toggle PayPal visibility when selected
    const selectedPayment = ref<string | null>(null);
    const onPaymentChange = () => {
        if (selectedPayment.value === 'paypal') {
            formData.isPaypal = true;
            formData.isCreditCard = false;
        } else if (selectedPayment.value === 'creditcard') {
            formData.isCreditCard = true;
            formData.isPaypal = false;
        }
    };

    const activeDropdownId = ref('');

    const creditcardOpt = ['MasterCard', 'VISA', 'Discover', 'American Express', 'Amex', 'JCB', 'AstroPayCart', 'Diners Club International'];
    const monthOpt = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const yearOpt: string[] = Array.from({ length: 30 }, (_, i) => (2025 + i).toString());

    const creditCardSelected = ref('Nothing Selected');
    const monthSelected = ref('Nothing Selected');
    const yearSelected = ref('Nothing Selected');

    function setActiveDropdownId(id: string) {
        activeDropdownId.value = id;
    }

    function setCard(cardOption: string) {
        creditCardSelected.value = cardOption;
        formData.creditCard = cardOption;
    }
    function setMonth(monthOption: string) {
        monthSelected.value = monthOption;
        formData.monthCard = monthOption;
    }
    function setYear(yearOption: string) {
        yearSelected.value = yearOption;
        formData.yearCard = yearOption;
    }
    

    
</script>

<style lang="css" scoped>
    .title.border-b::after {
        content: ' ';
        height: 2px;
        width: 114px;
        display: block;
        background-color: #20d600;
        position: relative;
        bottom: -1px;
        left: 0;
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

    .fade-enter-active, .fade-leave-active {
        transition: opacity 1s ease-in-out;
    }
    .fade-enter-from, .fade-leave-to {
        opacity: 0;
    }
</style>