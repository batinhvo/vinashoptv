<template>
    <div class="container max-w-[1400px]">
        <div class="mt-0 md:mt-10">
            <ul class="flex items-center bg-zinc-100 md:bg-white pl-2 xl:pl-0">
                <li class="px-3 py-2 hover:bg-zinc-100 rounded hover:border hover:border-gray-200">
                    <a href="/">Home</a>
                </li>
                <li class="px-2">
                    <i class="ec ec-arrow-right-categproes"></i>
                </li>
                <li class="px-3 py-2 md:bg-zinc-100 hover:bg-gray-200 rounded md:border md:border-gray-100">
                    <a href="/checkout">Checkout</a>
                </li>
            </ul>
        </div>

        <div v-if="cartStore.dataProductShow.length != 0" class="container my-10">
            <h1 class="text-center text-4xl font-normal pb-10">Checkout</h1>
            <form @submit.prevent="onSubmit">
                <div class="flex flex-wrap">
                    <!----------------------------------------------------- address ----------------------------------------------------------------->
                    <div class="w-full xl:w-3/5 px-4">
                        <div class="title border-b border-gray-300 mb-10">
                            <h3 class="text-2xl pb-2">Billing address</h3>
                        </div>

                        <div class="flex flex-wrap">
                            <InputField v-model="formData.billingInfo.firstName" name="firstName" label="First Name"
                                rules="required" placeholder="enter your first name" />
                            <InputField v-model="formData.billingInfo.lastName" name="lastName" label="Last Name" rules="required"
                                placeholder="enter your last name" />
                            <InputSelective v-model="formData.billingInfo.state" name="state" label="State" class="lg:w-1/2 px-1"
                                :widthfull=true :options="stateOpt" :placeholder="statePlaceholder"
                                @selected="stateOnSelected" />
                            <InputSelective v-model="formData.billingInfo.city" name="city" label="City" class="lg:w-1/2 px-1"
                                :options="cityOpt" :placeholder="cityPlaceholder" 
                                @selected="cityOnSelected" />
                            <InputField v-model="formData.billingInfo.zipCode" name="postCode" label="PostCode/Zip" :widthfull=true
                                type="number" placeholder="9999" />
                            <InputField v-model="formData.billingInfo.address" name="street" label="Street Address" rules="required"
                                :widthfull=true placeholder="enter your address" />
                            <InputField v-model="formData.billingInfo.email" name="email" label="Email Address"
                                rules="required|email" placeholder="enter your email address" />
                            <InputField v-model="formData.billingInfo.phone" name="phone" label="Phone" rules="required|phone"
                                placeholder="enter your phone number" />
                        </div>

                        <div class="title border-b border-gray-300 mb-10">
                            <h3 class="text-2xl pb-2">Shipping address</h3>
                        </div>
                        <!-------------------------------------------------------------------- different address ---------------------------------------------------------------------->
                        <div class="px-4 pb-4 flex flex-wrap items-center">
                            <InputCheckBox name="difAddres" v-model="isShippingInfo" :isStrong=false :value=true
                                label="Ship to a different address ?" />
                        </div>

                        <div v-if="isShippingInfo">
                            <div class="flex flex-wrap">
                                <InputField name="firstNameDif" label="First Name" rules="required"
                                    v-model="formData.shippingInfo.firstName" placeholder="enter your first name" />
                                <InputField name="lastNameDif" label="Last Name" rules="required"
                                    v-model="formData.shippingInfo.lastName" placeholder="enter your last name" />
                                <InputSelective name="stateDif" label="State" v-model="formData.shippingInfo.state" class="lg:w-1/2 px-1"
                                    rules="required" :widthfull=true :options="stateOpt" placeholder="Select State"
                                    @selected="stateOnSelected" />
                                <InputSelective name="cityDif" label="City" v-model="formData.shippingInfo.city"
                                    rules="required|number" :options="cityOpt" placeholder="Select City" class="lg:w-1/2 px-1"
                                    @selected="cityOnSelected" />
                                <InputField name="postCodeDif" label="PostCode/Zip" rules="required" type="number" :widthfull=true
                                    v-model="formData.shippingInfo.zipCode" placeholder="9999" />
                                <InputField name="streetDif" label="Street Address" rules="required"
                                    v-model="formData.shippingInfo.address" :widthfull=true placeholder="enter your address" />
                                <InputField name="emailDif" label="Email Address" rules="required|email"
                                    v-model="formData.shippingInfo.email" placeholder="enter your email address" />
                                <InputField name="phoneDif" label="Phone" rules="required|phone"
                                    v-model="formData.shippingInfo.phone" placeholder="enter your phone number" />
                            </div>
                        </div>

                        <InputField name="message" v-model="formData.note" label="Order notes (optional)"
                            as="textarea" rows="6" class="rounded-lg" :isStrong=false
                            placeholder="Tell us something more than you want about this order" :widthfull=true />
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
                                        <tr v-for="(product, index) in cartStore.dataProductShow" :key="index">
                                            <td class="py-4 border-t border-gray-300">
                                                <p class="mb-1">{{ [product.title, product.type].filter(Boolean).join(' - ') }}</p>
                                                <!-- Quantity -->
                                                <div
                                                    class="flex border border-zinc-300 rounded-full bg-white pl-5 pr-3 py-1">
                                                    <input v-model.number="product.quantity"
                                                        class="w-full focus:outline-none" type="number" name="quantity">
                                                    <button @click.prevent="cartStore.decrement(product)"
                                                        class="w-9 h-7 text-center hover:bg-gray-300 border border-white rounded-full">
                                                        <span class="text-xs">
                                                            <i class="fa fa-minus pb-1 text-gray-500"
                                                                aria-hidden="true"></i>
                                                        </span>
                                                    </button>
                                                    <button @click.prevent="cartStore.increment(product)"
                                                        class="w-9 h-7 text-center hover:bg-gray-300 border border-white rounded-full">
                                                        <span class="text-xs">
                                                            <i class="fa fa-plus pb-1 text-gray-500"
                                                                aria-hidden="true"></i>
                                                        </span>
                                                    </button>
                                                </div>

                                                <div v-for="(promotion, index) in cartStore.dataPromotion" :key="index">                                                
                                                    <div v-if="
                                                            product.skuId === promotion.skuIdIn &&
                                                            product.quantity >= promotion.quantityIn &&
                                                            (() => {
                                                            const gift = cartStore.quantityGift.find(g => g.skuId === promotion.skuIdOut);
                                                            return gift && gift.quantity > 0;
                                                            })()
                                                        "
                                                        class="flex items-center mt-3">
                                                        <p class="font-bold">Gift:</p>
                                                        <p class="border border-green-300 bg-green-100 rounded-lg py-0.5 px-3 ml-5">
                                                            {{ promotion.skuNameOut }} x {{ cartStore.quantityGift.find(g => g.skuId === promotion.skuIdOut)?.quantity || 0 }}
                                                        </p>
                                                        <button @click="cartStore.removeGift(promotion.skuIdOut)"
                                                            class="w-7 h-7 text-center hover:bg-gray-300 rounded-full ml-5">
                                                            <span class="text-xs">
                                                                <i class="fa fa-times pb-1 text-gray-500"
                                                                    aria-hidden="true"></i>
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="pl-4 xl:pl-8 py-4 content-baseline text-right">
                                                ${{ formatPrice(product.price * product.quantity) }}
                                                <button @click.prevent="cartStore.removeItem(index)"
                                                    class="w-7 h-7 text-center hover:bg-gray-300 hover:border rounded-full">
                                                    <span class="text-xs">
                                                        <i class="fa fa-times pb-1 text-gray-500"
                                                            aria-hidden="true"></i>
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
                                            <BodyOrderCouponcode v-model="formData.couponCode" />                                     
                                        </tr>
                                        <tr class="border-t border-gray-300">
                                            <th class="text-left py-3">Subtotal</th>
                                            <td class="text-right py-3">${{ formatPrice(cartStore.subTotal) }}</td>
                                        </tr>
                                        <tr class="border-t border-gray-300">
                                            <th class="text-left py-3">Shipping & Handling</th>
                                            <td class="text-right py-3">${{ formatPrice(cartStore.shippingFee) }}</td>
                                        </tr>
                                        <tr class="border-t border-gray-300">
                                            <th class="text-left py-3">Discount</th>
                                            <td class="text-right py-3">-${{ formatPrice(cartStore.discountValue + coupon) }}
                                            </td>
                                        </tr>
                                        <tr class="border-t border-gray-300">
                                            <th class="text-left py-3">Tax</th>
                                            <td class="text-right py-3">${{ formatPrice(cartStore.taxTotal) }}</td>
                                        </tr>
                                        <tr class="border-t border-gray-300">
                                            <th class="text-left py-3">Total</th>
                                            <th class="text-right py-3">${{ formatPrice(cartStore.orderTotal) }}</th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>

                            <!----------------------------------------------------------------- payment method --------------------------------------------------------->
                            <div class="pt-5 border-t-2 border-gray-300">
                                <div>
                                    <div class="flex items-center p-4 border-b border-gray-300">
                                        <input type="radio" name="payment" value="paypal" v-model="formData.paymentMethod"
                                            class="accent-[#169100] w-4 h-4">
                                        <label class="font-bold ml-3">PayPal <span class="text-[#167000]">What Is
                                                PayPal?</span></label>
                                    </div>
                                    <div v-show="formData.paymentMethod === 'paypal'"
                                        class="p-6 bg-gray-100 border-b border-gray-300">
                                        <span>Pay via PayPal; you can pay with your credit card if you don’t have a
                                            PayPal account.</span>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex items-center p-4 border-b border-gray-300">
                                        <input type="radio" name="payment" value="card" v-model="formData.paymentMethod"
                                            class="accent-[#169100] w-4 h-4 border">
                                        <label class="font-bold ml-3">Credit Card</label>
                                    </div>
                                    <div v-show="formData.paymentMethod === 'card'" class="p-6 bg-gray-100">
                                        <InputSelective name="creditCard" label="Select Your Credit Card"
                                            v-model="formData.cardInfo.cardType" rules="required" :widthfull=true
                                            :options="creditcardOpt" placeholder="Nothing Selected" />
                                        <InputField name="nameCard" label="Name On Card" v-model="formData.cardInfo.nameOnCard"
                                            rules="required" :widthfull=true placeholder="enter name on card" />
                                        <InputField name="cardNumber" label="Card Number" v-model="formData.cardInfo.cardNumber"
                                            rules="required" :widthfull=true placeholder="0000-0000-0000-0000"
                                            @input="maxInput" />
                                        <InputSelective name="monthCard" label="Month Expired"
                                            v-model="formData.cardInfo.expirationMonth" rules="required" :widthfull=true
                                            :options="monthOpt" placeholder="Nothing Selected" />
                                        <InputSelective name="yearCard" label="Year Expired" v-model="formData.cardInfo.expirationYear"
                                            rules="required" :widthfull=true :options="yearOpt"
                                            placeholder="Nothing Selected" />
                                        <InputField name="securityCode" label="Security Code"
                                            v-model="formData.cardInfo.cvv" rules="required" :widthfull=true
                                            placeholder="enter security code on card" />
                                    </div>
                                </div>
                            </div>
                            <InputCheckBox name="receiveEmail" v-model="isReceiveEmail" :isStrong=false
                                :widthfull=true :value=true
                                label="Yes, I would like to receive emails about special promotions, events and exclusive offers."
                                class="my-5" />
                            <div class="px-4 pb-5 flex flex-wrap items-center my-5">
                                <div class="w-full flex">
                                    <Field name="conditions" type="checkbox" v-model="isConditions" :value=true
                                        class="accent-[#169100]" />
                                    <label for="conditions" class="font-bold ml-2">I have read and agree to the website
                                        <span class="text-[#169100]">Terms And Conditions</span><span
                                            class="text-red-500"> *</span></label>
                                </div>
                            </div>

                            <button
                                class="btn p-4 bg-primary w-full text-xl font-bold rounded-full hover:bg-gray-700 hover:text-white mb-6">
                                Place order
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        <div v-else class="container my-10 text-center">
            <!-- <i class="text-[200px] fa-solid fa-basket-shopping"></i> -->

            <div class="text-5xl pb-5 font-bold text-[#00890c]">(-_-!)</div>
            <div class="text-2xl font-bold">~ YOUR CART IS EMPTY ~</div>

        </div>
    </div>
</template>

<script setup lang="ts">
    import type { ProductSubmit } from 'types/orderTypes';
    const isShippingInfo = ref(false);
    const isConditions = ref(true);
    const isReceiveEmail = ref(false);

    const formData = ref<{
        billingInfo: any;
        cardInfo: any;
        couponCode: string;
        note: string;
        paymentMethod: string;
        productList: ProductSubmit[];
        shippingInfo: any;
    }>({
        billingInfo: {
            address: '',
            city: '',
            state: '',
            country: 'US',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            zipCode: '',           
        },
        cardInfo: {
            cardNumber: '',
            cardType: '',
            cvv: '',
            expirationMonth: 0,
            expirationYear: 0,
            nameOnCard: ''
        },
        couponCode: '',
        note: '',
        paymentMethod: '',
        productList: [],
        shippingInfo: {
            address: '',
            city: '',
            state: '',
            country: 'US',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            zipCode: '',       
        },
    });

    //--------------------------------API-------------------------------------//

    const stateStore = useStateStore();
    const cartStore = useCartStore();
    const authStore = useAuthStore();
    const notify = useNotify();

    const stateOpt = computed(() => stateStore.states.map((state) => state.name));
    const cityOpt = computed(() => stateStore.cities.map((city) => city.name));

    const newStateSelect = ref<string>('');
    const coupon = ref<number>(0);


    const statePlaceholder = ref('Select State');
    const cityPlaceholder = ref('Select City');

    const stateOnSelected = (value: string) => {
        newStateSelect.value = value;
        formData.value.billingInfo.state = stateStore.states.find((sta) => sta.name === value)?.code || '';
        cityPlaceholder.value = 'Select City';
    }

    const cityOnSelected = (value: string) => {
        formData.value.billingInfo.city = String(stateStore.cities.find((city) => city.name === value)?.id || 0);
    }

    const getNameState = async (valueState: string, valueCity: number) => {
        if (valueState) await stateStore.fetchCities(valueState); 
        formData.value.billingInfo.state = valueState;
        formData.value.billingInfo.city = String(valueCity);

        statePlaceholder.value = stateStore.states.find((state) => state.code === valueState)?.name || 'Select State';
        cityPlaceholder.value = stateStore.cities.find((city) => city.id === valueCity)?.name || 'Select City';
    }

    const handleCouponCode = (val: string) => {
        formData.value.couponCode = val;
    }

    watch(newStateSelect, async (newState) => {
        const state = stateStore.states.find((state) => state.name === newState);
        if (state) {
            await stateStore.fetchCities(state.code); 
        } else {
            stateStore.resetCities();
        }
    });

    watch(() => cartStore.couponValue, (val) => {
            coupon.value = val ?? 0;
    },{ immediate: true }
    );

    watch(() => formData.value.billingInfo.state, (val) => {
            cartStore.checklocalTax(val);
    },{ immediate: true }
    );

    watchEffect(() => {
        if (authStore.userInfo) {
            Object.assign(formData.value.billingInfo, {
            firstName: authStore.userInfo.firstName || "",
            lastName: authStore.userInfo.lastName || "",
            email: authStore.userInfo.email || "",
            phone: authStore.userInfo.phone || "",
            address: authStore.userInfo.address || "",
            state: authStore.userInfo.state || "",
            zip: authStore.userInfo.zip || "",
            city: authStore.userInfo.cityId || "",
            });

            getNameState(authStore.userInfo.state, authStore.userInfo.cityId);
        }
    });

    watchEffect(() => {
        if(cartStore.dataProductShow) {
            formData.value.productList = cartStore.dataProductShow.map(item => ({
                gift: [],
                media: item.media,
                name: item.title,
                price: item.price,
                productId: item.productId,
                promotion: [],
                quantity: item.quantity,
                salePrice: item.salePrice,
                skuId: item.skuId,
                tax: item.tax,
                weight: item.weight,
            }))
        }
    });

    watch(() => isShippingInfo.value, (val) => {
        if (!val) {
            formData.value.shippingInfo = { ...formData.value.billingInfo };
        }
        console.log(formData.value.shippingInfo)
    },
    { immediate: true } // chạy ngay khi khởi tạo
    );

    onMounted(async () => {
        await stateStore.fetchStates();
        await cartStore.fetchWeights();
        await authStore.getInfoUser();
    });

    onMounted(() => {
        cartStore.dataCartBuyNow();
        cartStore.loadCartFromStorage();
        cartStore.clearBuyNowOnReload();
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

    const selectedPayment = ref<string | null>(null);

    //----------------------------HANDLE SUBMIT-----------------------------------//

    

    //-----SUBMIT-----//

    const { handleSubmit } = useForm();
    const onSubmit = handleSubmit( async () => {
        console.log(formData.value)
        try {
            notify({
                message: 'Order Placed Successfully. Thank you for shopping with us!',
                type: 'success',
                time: 3000,
            });   
        } catch (error) {
            notify({              
                message: 'Order Failed. Please try again!',
                type: 'error',
                time: 2000,
            });
        }
    });

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
    -moz-appearance: textfield;
    /* Ẩn trên Firefox */
    appearance: none;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>