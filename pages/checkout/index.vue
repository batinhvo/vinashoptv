<template>
    <div class="container max-w-[1400px] relative">
        <div v-if="isLoading" class="fixed inset-0 bg-white/80 flex flex-col items-center justify-center z-50"> 
            <div class="flex space-x-2">
                <span class="w-3 h-3 bg-green-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span class="w-3 h-3 bg-green-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span class="w-3 h-3 bg-green-600 rounded-full animate-bounce"></span>
            </div>
            <p class="mt-4 text-gray-700 font-medium text-lg">Loading</p>
        </div>

        <div v-else>
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
                        <div class="w-full xl:w-1/2 px-4">
                            <div class="title border-b border-gray-300 mb-10">
                                <h3 class="text-2xl pb-2">Billing address</h3>
                            </div>

                            <div class="flex flex-wrap">
                                <InputField v-model="formData.billingInfo.firstName" 
                                    name="firstName" label="First Name" rules="required" placeholder="enter your first name" />

                                <InputField v-model="formData.billingInfo.lastName" 
                                    name="lastName" label="Last Name" rules="required" placeholder="enter your last name" />

                                <InputSelective             
                                    v-model="billingLocation.newStateSelect.value"               
                                    :options="billingLocation.stateOpt" 
                                    :placeholder="billingLocation.statePlaceholder.value"
                                    @selected="billingLocation.stateOnSelected" 
                                    :rules="!authStore.authenticated ? 'stateSelect' : ''"
                                    :widthfull=true 
                                    isSearch                                    
                                    name="state" label="State" class="lg:w-1/2 px-1"/>

                                <InputSelective 
                                    :options="billingLocation.cityOpt" 
                                    :placeholder="billingLocation.cityPlaceholder.value"                                     
                                    isSearch
                                    @selected="billingLocation.cityOnSelected" 
                                    :rules="!authStore.authenticated ? 'citySelect' : ''"
                                    name="city" label="City" class="lg:w-1/2 px-1"/>

                                <InputField v-model="formData.billingInfo.zipCode" 
                                    :widthfull=true
                                    name="postCode" label="PostCode/Zip" rules="zipcode" type="number" placeholder="99999" />

                                <InputField v-model="formData.billingInfo.address" 
                                    :widthfull=true 
                                    placeholder="enter your address" name="street" label="Street Address" rules="required"/>

                                <InputField v-model="formData.billingInfo.email"
                                    name="email" label="Email Address" rules="required|email" placeholder="enter your email address"/>

                                <InputField v-model="formData.billingInfo.phone"
                                    name="phone" label="Phone" rules="required|phone" placeholder="enter your phone number" />
                            </div>

                            <div class="title border-b border-gray-300 mb-10">
                                <h3 class="text-2xl pb-2">Shipping address</h3>
                            </div>
                            <!-------------------------------------------------------------------- different address ---------------------------------------------------------------------->
                            <div class="px-4 pb-4 flex flex-wrap items-center">
                                <InputCheckBox v-model="isShippingInfo"
                                    
                                    name="difAddress" label="Ship to a different address ?" :is-strong="false"/>
                            </div>

                            <div v-if="isShippingInfo">
                                <div class="flex flex-wrap">
                                    <InputField 
                                        v-model="shippingInfo.firstName"                                    
                                        name="firstNameDif" label="First Name" rules="required" placeholder="enter your first name" />

                                    <InputField 
                                        v-model="shippingInfo.lastName"
                                        name="lastNameDif" label="Last Name" rules="required" placeholder="enter your last name" />                   

                                    <InputSelective         
                                        v-model="shippingLocation.newStateSelect.value"              
                                        :options="shippingLocation.stateOpt" 
                                        :placeholder="shippingLocation.statePlaceholder.value"
                                        @selected="shippingLocation.stateOnSelected" 
                                        :widthfull=true 
                                        isSearch
                                        :rules="isShippingInfo ? 'stateSelect' : ''"
                                        name="stateDif" label="State" class="lg:w-1/2 px-1"/>

                                    <InputSelective  
                                        :options="shippingLocation.cityOpt" 
                                        :placeholder="shippingLocation.cityPlaceholder.value"                                     
                                        @selected="shippingLocation.cityOnSelected" 
                                        isSearch
                                        :rules="isShippingInfo ? 'citySelect' : ''"
                                        name="cityDif" label="City" class="lg:w-1/2 px-1"/>


                                    <InputField 
                                        v-model="formData.shippingInfo.zipCode" 
                                        :widthfull=true
                                        name="postCodeDif" label="PostCode/Zip" rules="zipcode" type="number" placeholder="99999" />

                                    <InputField 
                                        v-model="shippingInfo.address" 
                                        :widthfull=true 
                                        name="streetDif" label="Street Address" rules="required" placeholder="enter your address" />

                                    <InputField 
                                        v-model="shippingInfo.email" 
                                        name="emailDif" label="Email Address" rules="email|required" placeholder="enter your email address" />
                                        
                                    <InputField 
                                        v-model="shippingInfo.phone" 
                                        name="phoneDif" label="Phone" rules="phone|required"  placeholder="enter your phone number" />
                                </div>
                            </div>

                            <InputField 
                                v-model="formData.note"
                                :is-strong=false
                                :widthfull=true
                                name="message"  label="Order notes (optional)" as="textarea" rows="6" class="rounded-lg" 
                                placeholder="Tell us something more than you want about this order" />
                        </div>

                        <!-- ------------------------------------------------------------------invoice --------------------------------------------------------------------->
                        <div class="w-full xl:w-1/2 px-4">
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
                                                        <div v-if="checkGiftCondition(product, promotion)" class="flex items-center mt-3">
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
                                                    ${{ formatPrice((product.salePrice != 0 ? product.salePrice : product.price) * product.quantity) }}
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
                                                <BodyOrderCouponCode v-model="formData.couponCode" />                                     
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
                                        <div class="flex items-center p-4 pl-0 border-b border-gray-300">
                                            <label class="font-bold ml-3 cursor-pointer">
                                                <input 
                                                    type="radio" 
                                                    name="payment" 
                                                    value="paypal" 
                                                    v-model="formData.paymentMethod"
                                                    class="accent-[#169100] w-4 h-4"
                                                >
                                                <span class="font-bold ml-3">
                                                    PayPal <span class="text-[#167000]">What Is PayPal?</span>
                                                </span>
                                            </label>
                                        </div>
                                        <div v-show="formData.paymentMethod === 'paypal'"
                                            class="p-6 bg-gray-100 border-b border-gray-300">
                                            <span>Pay via PayPal; you can pay with your credit card if you don’t have a
                                                PayPal account.</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="flex items-center p-4 pl-0 border-b border-gray-300">
                                            <label class="font-bold ml-3 cursor-pointer">
                                                <input 
                                                    type="radio" 
                                                    name="payment" 
                                                    value="card" 
                                                    v-model="formData.paymentMethod"
                                                    class="accent-[#169100] w-4 h-4"
                                                >                                               
                                                <span class="ml-3">Credit Card   </span>                                            
                                            </label>
                                        </div>
                                        <div v-show="formData.paymentMethod === 'card'" class="p-6 bg-gray-100">
                                            <InputSelective 
                                                v-model="formData.cardInfo.cardType"
                                                :widthfull=true
                                                :options="creditcardOpt"       
                                                :rules="formData.paymentMethod === 'card' ? 'selectRequired' : ''"                                     
                                                name="creditCard" label="Select Your Credit Card" placeholder="Nothing Selected" />

                                            <InputField 
                                                v-model="formData.cardInfo.nameOnCard"
                                                :widthfull=true
                                                :rules="formData.paymentMethod === 'card' ? 'required' : ''"
                                                name="nameCard" label="Name On Card" placeholder="enter name on card" />

                                            <InputField 
                                                v-model="formData.cardInfo.cardNumber"
                                                @input="maxInput"
                                                :widthfull=true                                            
                                                :rules="formData.paymentMethod === 'card' ? 'required' : ''"
                                                name="cardNumber" label="Card Number" placeholder="0000-0000-0000-0000" />

                                            <InputSelective 
                                                v-model="formData.cardInfo.expirationMonth"                                            
                                                :widthfull=true                                                                                      
                                                :options="monthOpt" 
                                                :rules="formData.paymentMethod === 'card' ? 'selectRequired' : ''"
                                                name="monthCard" label="Month Expired" placeholder="Nothing Selected" />

                                            <InputSelective 
                                                v-model="formData.cardInfo.expirationYear"
                                                :widthfull=true 
                                                :options="yearOpt"         
                                                :rules="formData.paymentMethod === 'card' ? 'selectRequired' : ''"                                   
                                                name="yearCard" label="Year Expired" placeholder="Nothing Selected" />

                                            <InputField 
                                                v-model="formData.cardInfo.cvv" 
                                                :widthfull=true
                                                :rules="formData.paymentMethod === 'card' ? 'required' : ''"
                                                name="securityCode" label="Security Code" placeholder="enter security code on card" />
                                        </div>
                                    </div>
                                </div>
                                <InputCheckBox
                                    v-model="isReceiveEmail" 
                                    :is-strong="false"
                                    widthfull 
                                    :value="true"
                                    label="Yes, I would like to receive emails about special promotions, events and exclusive offers."
                                    name="receiveEmail"  class="my-5" />

                                <div class="px-4 pb-5 flex flex-wrap items-center my-5">
                                    <div class="flex px-0 ">
                                        <Field
                                            v-model="isConditions" 
                                            :value="true"
                                            :is-strong="false"
                                            name="conditions" type="checkbox" class="accent-[#169100]" checked/>   

                                        <label for="conditions" class="font-bold ml-2">I have read and agree to the website
                                            <span class="text-[#169100]">Terms And Conditions</span>
                                            <span class="text-red-500"> *</span>
                                        </label>
                                    </div>
                                </div>

                                <button v-if="!isSubmit"
                                    class="btn p-4 bg-primary w-full text-xl font-bold rounded-full hover:bg-gray-700 hover:text-white mb-6" :disabled="!formData.paymentMethod">
                                    Place order
                                </button>

                                <button v-else
                                    class="btn p-4 bg-primary w-full text-xl font-bold rounded-full hover:bg-gray-700 hover:text-white mb-6" disabled>
                                    Loading...
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
    </div>
</template>

<script setup lang="ts">
    import type { CartItem, Gift, ProductSubmit, Promotion } from 'types/orderTypes';

    const isShippingInfo = ref(false);
    const isConditions = ref(true);
    const isReceiveEmail = ref(false);
    const isLoading = ref(true);
    const isSubmit = ref(false);

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
    const orderStore = useOrderStore();
    const notify = useNotify();

    const coupon = ref<number>(0);
    const giftList = ref<Gift[]>([]);
    const promotionList = ref<Promotion[]>([]);

    const billingLocation = useLocationSelect(formData, 'billingInfo');
    const shippingLocation = useLocationSelect(formData, 'shippingInfo');

    const checkGiftCondition = (product: CartItem, promotion: Promotion) => {
        if (!product || !promotion) return false;

        // điều kiện chính
        const matchSku = product.skuId === promotion.skuIdIn;
        const enoughQuantity = product.quantity >= promotion.quantityIn;

        return matchSku && enoughQuantity;
    };    

    const shippingInfo = computed(() => {
        return isShippingInfo.value
            ? formData.value.shippingInfo
            : formData.value.billingInfo
        }
    );

    const getFinalFormData = () => {
        // Map gift vào đúng product
        const productWithGiftAndPromo = formData.value.productList.map(prod => {
            const relatedGifts = giftList.value.filter(g => g.skuId === prod.skuId);
            const relatedPromotions = cartStore.dataPromotion.filter(p => p.skuIdIn === prod.skuId);

            const productData: any = {
                ...prod,
            };

            if (relatedGifts.length > 0) {
                productData.gift = relatedGifts;
            }

            if (relatedPromotions.length > 0) {
                productData.promotion = relatedPromotions;
            }

            return productData;
        });

        return {
            ...formData.value,
            shippingInfo: { ...shippingInfo.value },
            billingInfo: { ...formData.value.billingInfo },
            productList: productWithGiftAndPromo      // ⬅️ đã có gift trong mỗi product
        };
    };

    function normalizeCardInfo() {
        const expMonth = formData.value.cardInfo.expirationMonth
        const expYear = formData.value.cardInfo.expirationYear

        formData.value.cardInfo.expirationMonth = Number(expMonth)
        formData.value.cardInfo.expirationYear = Number(expYear)
    };

    function refreshGiftList() {
        // giftList.value = [];
        // promotionList.value = [];

        // cartStore.dataProductShow.forEach(product => {
        //     cartStore.dataPromotion.forEach(promo => {
        //         if (checkGiftCondition(product, promo)) {
        //             const exists = giftList.value.some(g => g.skuId === promo.skuIdOut);
        //             if (!exists) {
        //                 giftList.value.push({
        //                     name: promo.name,
        //                     quantity: product.quantity,
        //                     skuId: promo.skuIdOut,
        //                     weight: product.weight,
        //                 });

        //                 promotionList.value.push(promo)
        //             }
        //         }
        //     });
        // });

        const giftMap = new Map<number, Gift>();
        promotionList.value = [];

        cartStore.dataProductShow.forEach(product => {
            cartStore.dataPromotion
            .filter(promo => checkGiftCondition(product, promo))
            .forEach(promo => {
                if (!giftMap.has(promo.skuIdOut)) {
                giftMap.set(promo.skuIdOut, {
                    name: promo.name,
                    quantity: product.quantity,
                    skuId: promo.skuIdOut,
                    weight: product.weight,
                });
                promotionList.value.push(promo);
                }
            });
        });

        giftList.value = Array.from(giftMap.values());
    };

    function setLocation() {
        billingLocation.setStateAndCity(formData.value.billingInfo.state, Number(formData.value.billingInfo.city));
        shippingLocation.setStateAndCity(formData.value.shippingInfo.state, Number(formData.value.shippingInfo.city));
    };

    watch([() => cartStore.dataProductShow, () => cartStore.dataPromotion], refreshGiftList);

    watch(() => cartStore.couponValue, (val) => { coupon.value = val ?? 0 }, { immediate: true });

    watch(() => formData.value.billingInfo.state, (val) => { cartStore.checklocalTax(val) }, { immediate: true });

    watch(() => formData.value.shippingInfo.state, (val) => { cartStore.checklocalTax(val) }, { immediate: true });

    watch(
        () => authStore.userInfo,
        (user) => {
            if (!user) return;

            Object.assign(formData.value.billingInfo, {
                firstName: user.firstName ?? "",
                lastName: user.lastName ?? "",
                email: user.email ?? "",
                phone: user.phone ?? "",
                address: user.address ?? "",
                state: user.state ?? "",
                zipCode: user.zip ?? "",
                city: user.cityId ?? "",
            });  
        },
        { immediate: true }
    );

    watch(
        () => ({
            bState: formData.value.billingInfo.state,
            bCity: formData.value.billingInfo.city,
            sState: formData.value.shippingInfo.state,
            sCity: formData.value.shippingInfo.city,
        }),
        () => setLocation(),
        { immediate: true }
    );

    watch(
        () => cartStore.dataProductShow,
        (list) => {
            if (!list) return;
            formData.value.productList = list.map(item => ({
                media: item.media,
                name: item.type ? item.title + ' - ' + item.type : item.title,
                price: item.price,
                productId: item.productId,
                quantity: item.quantity,
                salePrice: item.salePrice != 0 ? item.salePrice : item.price,
                skuId: item.skuId,
                tax: item.tax,
                weight: item.weight,
            }));
        },
        { immediate: true }
    );

    onMounted(async () => {
        cartStore.loadCartFromStorage();
        cartStore.dataCartBuyNow();
        cartStore.clearBuyNowOnReload();

        await Promise.all([
            stateStore.fetchStates(),
            cartStore.fetchWeights(),
        ]);
        
        setTimeout(() => {
            isLoading.value = false;
        }, 2000);
    });

    //----------------------------INVOICE FORM-----------------------------------//.
    const creditcardOpt = ['MasterCard', 'VISA', 'Discover', 'American Express', 'Amex', 'JCB', 'AstroPayCart', 'Diners Club International'];
    const monthOpt = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const yearOpt: string[] = Array.from({ length: 30 }, (_, i) => (2025 + i).toString());

    const maxInput = (e: Event) => {
        const target = e.target as HTMLInputElement;
        if (target.value.length > 16) {
            target.value = target.value.slice(0, 16); // Cắt bớt nếu vượt quá
        }
    };

    // handle price total
    const formatPrice = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    };

    //----------------------------HANDLE SUBMIT-----------------------------------//
    const { handleSubmit } = useForm();
    const onSubmit = handleSubmit(
        async () => {
            // VALID CASE
            isSubmit.value = true;
            const payload = getFinalFormData()

            try {
                normalizeCardInfo()
                await orderStore.submitOrder(payload);
                await cartStore.clearCart();
                cartStore.clearLocalCart();           
            } catch (error) {
                notify({
                    message: 'Order failed. Please check information and try again!',
                    type: 'error',
                    time: 5000,
                });
            }

            setTimeout(() => {
                isSubmit.value = false;
            }, 8000);
        },

        // INVALID CASE 🚨
        (errors) => {
            notify({
                message: 'Please check the required fields!',
                type: 'error',
                time: 3000,
            });

            console.warn("Validation errors:", errors);
        }
    );
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