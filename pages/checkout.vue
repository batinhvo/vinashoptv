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
                            <InputField name="firstName" label="First Name" rules="required" v-model="formData.firstName" placeholder="enter your first name" />
                            <InputField name="lastName" label="Last Name" rules="required" v-model="formData.lastName" placeholder="enter your last name" />
                            <InputSelective name="state" label="State" v-model="formData.state" rules="required" :widthfull=true :options="stateOpt" placeholder="Select State" @selected="stateOnSelected" />
                            <InputSelective name="city" label="City" v-model="formData.city" rules="required" :options="cityOpt" placeholder="Select City" @selected="cityOnSelected" />
                            <InputField name="postCode" label="PostCode/Zip" rules="required" v-model="formData.postCode" placeholder="9999" />
                            <InputField name="street" label="Street Address" rules="required" v-model="formData.street" :widthfull=true placeholder="enter your address" />
                            <InputField name="email" label="Email Address" rules="required|email" v-model="formData.email" placeholder="enter your email address" />
                            <InputField name="phone" label="Phone" rules="required|phone" v-model="formData.phone" placeholder="enter your phone number" />
                        </div>

                        <div class="title border-b border-gray-300 mb-10">
                            <h3 class="text-2xl pb-2">Shipping address</h3>
                        </div>
                        <!-------------------------------------------------------------------- different address ---------------------------------------------------------------------->
                        <div class="px-4 pb-4 flex flex-wrap items-center">                    
                            <InputCheckBox name="difAddres" v-model="formData.difAddres" :isStrong=false :value=true label="Ship to a different address ?" />                                        
                        </div>   

                        <div v-if="formData.difAddres">
                            <div class="flex flex-wrap">
                            <InputField name="firstNameDif" label="First Name" rules="required" v-model="formData.firstNameDif" placeholder="enter your first name" />
                            <InputField name="lastNameDif" label="Last Name" rules="required" v-model="formData.lastNameDif" placeholder="enter your last name" />
                            <InputSelective name="stateDif" label="State" v-model="formData.stateDif" rules="required" :widthfull=true :options="stateOpt" placeholder="Select State" @selected="stateOnSelected" />
                            <InputSelective name="cityDif" label="City" v-model="formData.city" rules="required" :options="cityOpt" placeholder="Select City" @selected="cityOnSelected" />
                            <InputField name="postCodeDif" label="PostCode/Zip" rules="required" v-model="formData.postCodeDif" placeholder="9999" />
                            <InputField name="streetDif" label="Street Address" rules="required" v-model="formData.streetDif" :widthfull=true placeholder="enter your address" />
                            <InputField name="emailDif" label="Email Address" rules="required|email" v-model="formData.emailDif" placeholder="enter your email address" />
                            <InputField name="phoneDif" label="Phone" rules="required|phone" v-model="formData.phoneDif" placeholder="enter your phone number" />
                        </div>
                        </div>
     
                        <InputField name="message" v-model="formData.message" label="Order notes (optional)" as="textarea" rows="6" class="rounded-lg" :isStrong=false placeholder="Tell us something more than you want about this order" :widthfull=true />
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
                                        <tr v-for="(pro, index) in cartStore.cartPro" :key="index">
                                            <td class="py-4 border-t border-gray-300">
                                                <p class="mb-1">{{ pro.title + (pro.type ? ' - ' + pro.type : '') }}</p>
                                                <!-- Quantity -->                       
                                                <div class="flex border border-zinc-300 rounded-full bg-white pl-5 pr-3 py-1">                           
                                                    <input v-model="pro.quantity" class="w-full focus:outline-none" type="number" name="quantity">
                                                    <button @click.prevent="decrement(pro)" class="w-9 h-7 text-center hover:bg-gray-300 border border-white rounded-full">
                                                        <span class="text-xs">
                                                            <i class="fa fa-minus pb-1 text-gray-500" aria-hidden="true"></i>
                                                        </span>
                                                    </button>
                                                    <button @click.prevent="increment(pro)" class="w-9 h-7 text-center hover:bg-gray-300 border border-white rounded-full">                                    
                                                        <span class="text-xs">
                                                            <i class="fa fa-plus pb-1 text-gray-500" aria-hidden="true"></i>
                                                        </span>
                                                    </button>
                                                </div>             
                                                <!-- <div class="flex items-center mt-3">
                                                    <p class="font-bold">Gift:</p>
                                                    <p class="border border-green-300 bg-green-100 rounded-lg py-0.5 px-3 ml-5">Assanta Hair Color # 5</p>
                                                    <button class="w-7 h-7 text-center hover:bg-gray-300 rounded-full ml-5">
                                                        <span class="text-xs">
                                                            <i class="fa fa-times pb-1 text-gray-500" aria-hidden="true"></i>
                                                        </span>
                                                    </button>
                                                </div> -->
                                            </td>
                                            <td class="pl-4 xl:pl-8 py-4 content-baseline text-right">
                                                ${{ formatPrice(pro.price * pro.quantity) }}
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
                                                    <input class="w-full focus:outline-none p-2.5 pl-5 focus:border-blue-300 border border-zinc-300 rounded-l-full bg-white" type="text" placeholder="Coupon Code" name="coupon">
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
                                        <input type="radio" name="payment" value="paypal"
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
                                        <input type="radio" name="payment" value="creditcard"
                                            v-model="selectedPayment"                                                                                                     
                                            class="accent-[#169100] w-4 h-4 border" 
                                            >
                                        <label class="font-bold ml-3">Credit Card</label>
                                    </div>                                   
                                    <div v-show="selectedPayment === 'creditcard'" class="p-6 bg-gray-100">
                                        <InputSelective name="creditCard" label="Select Your Credit Card" v-model="formData.creditCard" rules="required" :widthfull=true :options="creditcardOpt" placeholder="Nothing Selected"/>                                       
                                        <InputField name="nameCard" label="Name On Card" v-model="formData.nameCard" rules="required" :widthfull=true placeholder="enter name on card" />
                                        <InputField name="cardNumber" label="Card Number" v-model="formData.cardNumber" rules="required" :widthfull=true placeholder="0000-0000-0000-0000" @input="maxInput"/>
                                        <InputSelective name="monthCard" label="Month Expired" v-model="formData.monthCard" rules="required" :widthfull=true :options="monthOpt" placeholder="Nothing Selected"/>
                                        <InputSelective name="yearCard" label="Year Expired" v-model="formData.yearCard" rules="required" :widthfull=true :options="yearOpt" placeholder="Nothing Selected"/>
                                        <InputField name="securityCode" label="Security Code" v-model="formData.securityCode" rules="required" :widthfull=true placeholder="enter security code on card" />
                                        
                                    </div>
                                </div>                       
                            </div>                                              
                            <InputCheckBox name="receiveEmail" v-model="formData.receiveEmail" :isStrong=false :widthfull=true :value=true label="Yes, I would like to receive emails about special promotions, events and exclusive offers." class="my-5"/>                                                                                                  
                            <div class="px-4 pb-5 flex flex-wrap items-center my-5">                   
                                <div class="w-full flex">
                                    <Field name="conditions" type="checkbox" v-model="formData.conditions" :value=true class="accent-[#169100]" />                    
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
import type { ProductDetails, Products } from 'types/productTypes';

    const formData = ref({
        firstName: '',
        lastName: '',
        state: '',
        city: '',
        postCode: '',
        street: '',
        email: '',
        phone: '',
        address: '',

        difAddres: false,

        firstNameDif: '',
        lastNameDif: '',
        stateDif: '',
        cityDif: '',
        postCodeDif: '',
        streetDif: '',
        emailDif: '',
        phoneDif: '',
        addressDif: '',

        message: '',

        nameCard: '',
        creditCard: '',
        cardNumber: '',
        monthCard: '',
        yearCard: '',
        securityCode: '',
        receiveEmail: false,
        conditions: true,

        isPaypal: false,
        isCreditCard: false,
    });

    //-----SUBMIT-----//
    const { handleSubmit } = useForm();
    const onSubmit = handleSubmit(() => {
        alert(123)
    });

    //--------------------------------API-------------------------------------//

    const stateStore = useStateStore();
    const productStore = useProductStore();
    const cartStore = useCartStore();

    const stateOpt = computed(() => stateStore.states.map((state) => state.name));
    const cityOpt = computed(() => stateStore.cities.map((city) => city.name));

    const newStateSelect = ref<string>('');

    const stateOnSelected = (value: string) => {
        newStateSelect.value = value;
    }
    const cityOnSelected = (value: string) => {
        console.log('Selected value:', value)
    }

    watch(newStateSelect, async (newState) => {
        const state = stateStore.states.find((state) => state.name === newState);
        if (state) {
            await stateStore.fetchCities(state.code); 
        } else {
            stateStore.resetCities();
        }
    });

    onMounted(async () => {
        await stateStore.fetchStates();
    });


    const creditcardOpt = ['MasterCard', 'VISA', 'Discover', 'American Express', 'Amex', 'JCB', 'AstroPayCart', 'Diners Club International'];
    const monthOpt = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const yearOpt: string[] = Array.from({ length: 30 }, (_, i) => (2025 + i).toString());

    const maxInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.value.length > 16) {
        target.value = target.value.slice(0, 16); // Cắt bớt nếu vượt quá
    }
    };

    //----------------------------INVOICE FORM-----------------------------------//.

    // handle price total
    const formatPrice = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    };

    // quantity
    const increment = (item: any) => {
        item.quantity++;
    };
    const decrement = (item: any) => {
        if (item.quantity > 1) item.quantity--;
    };

    const selectedPayment = ref<string | null>(null);

    //----------------------------HANDLE BUY-----------------------------------//

    //buy now 
    onMounted(() => {
        cartStore.loadCheckoutData()
    })
    
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