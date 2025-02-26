<template>
    <div class="container">
        <div class="mt-0 md:mt-10">
          <ul class="flex items-center bg-zinc-100 md:bg-white pl-2 xl:pl-0">
            <li class="px-3 py-2 hover:bg-zinc-100 rounded hover:border hover:border-gray-200"><a href="/">Home</a></li>
            <li class="px-2"><i class="ec ec-arrow-right-categproes"></i></li>
            <li class="px-3 py-2 md:bg-zinc-100 hover:bg-gray-200 rounded md:border md:border-gray-100"><a href="/user/orderhistory">Order History</a></li>
          </ul>
        </div>
        <div class="my-10 px-5 xl:px-0">
            <h1 class="text-center text-4xl font-normal pb-10">Order History Pages</h1>
            <div class="bg-primary py-3 border-l-8 border-[#1bb300] pl-5">                    
                <span>Need to review an old invoice? This page will help you to view your current invoice status or past invoice history. You can also write a review for items you've purchased.</span>
            </div>
            <div class="bg-zinc-100 border border-gray-300 px-6 pt-8">
                <form @submit.prevent="onSubmit">
                    <div class="flex flex-wrap">                                  
                        <InputField name="orderFrom" label="Order From" v-model="formData.orderFrom" type="date" rules="required" />
                        <InputField name="orderTo" label="Order To" v-model="formData.orderTo" type="date" rules="required" />
                        <InputField name="phone" label="Phone" v-model="formData.phone" rules="required|phone" placeholder="enter phone number" />
                        <InputSelective name="phoneOf" label="Phone Number Of" v-model="formData.phoneOf" rules="required" :options="PhoneOpt" placeholder="Nothing Selected"/>  
                        <InputSelective name="statusOrder" label="Order Status" v-model="formData.phoneOf" rules="required" :options="statusOpt" placeholder="Nothing Selected"/>                                                          
                    </div>
                    <div class="flex mb-10 px-3">
                        <button @click.prevent="clearForm(resetForm)" class="btn btn-primary bg-gray-700 py-2 px-10 rounded-full text-base text-white font-normal hover:shadow-[0_4px_11px_0_rgba(0,0,0,0.5)]">
                            Clear
                        </button>
                        <button type="submit" class="btn btn-primary bg-primary py-2 px-10 ml-5 rounded-full text-base text-gray-22 font-normal hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)]">
                            Filter
                        </button>
                    </div>
                </form>
            </div>     
            
            <!-- table details -->
            <div class="bg-zinc-100 border border-gray-300 p-5 mt-5">
                <div class="border border-gray-300 flex flex-wrap py-4 text-center font-bold items-center">
                    <div class="w-1/4 lg:w-1/5">Order ID</div>
                    <div class="w-1/4 lg:w-1/5">Order By</div>
                    <div class="w-1/4 lg:w-1/5">Order Status</div>
                    <div class="w-1/4 lg:w-1/5">Total</div>
                </div>

                <div class="border border-gray-300 flex flex-wrap text-center py-3 items-center">
                    <div class="w-1/4 lg:w-1/5 border-r border-gray-200">
                        <span>#7518</span><br>
                        <span>(12/30/2024 18:51)</span>
                    </div>
                    <div class="w-1/4 lg:w-1/5 py-3 border-r border-gray-200">Ba Tinh Vo</div>
                    <div class="w-1/4 lg:w-1/5 py-3 border-r border-gray-200">Pending</div>
                    <div class="w-1/4 lg:w-1/5 py-3 border-r border-gray-200">$13.5567</div>
                    <div class="lg:w-1/5 lg:block hidden">
                        <button @click.prevent="OpenDetails" class="btn btn-primary bg-primary py-1.5 px-3 rounded-full text-xs text-gray-22 font-normal hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)]">
                            More Details
                        </button>
                    </div>
                </div>

                <div class="w-full text-center border border-gray-300 py-3 lg:hidden">
                    <button @click.prevent="OpenDetails" class="btn btn-primary bg-primary py-1.5 px-3 rounded-full text-xs text-gray-22 font-normal hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)]">
                        More Details
                    </button>
                </div>

                <div class="bg-white" :class="[isOpenDetails ? 'overflow-visible' : 'hidden']">
                    <div class="text-center border border-gray-300">
                        <BodyOrderBillingInfo />
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    definePageMeta({middleware: 'auth-middle'})

    const isOpenDetails = ref(false);
    const OpenDetails = () => {
        isOpenDetails.value = !isOpenDetails.value;
    }

    const PhoneOpt = ['Shipping', 'Billing'];
    const statusOpt = ['All', 'Unable', 'Pending', 'Shipped', 'Cancelled', 'Returned'];

    const clearForm = (resetForm: () => void) => {
        resetForm(); 
    };

    const formData = ref({
        phoneOf: '',
        statusOrder: '',
        orderFrom: '',
        orderTo: '',
        phone: '',
    });

    const { handleSubmit, resetForm } = useForm();
    const onSubmit = handleSubmit(() => {
        alert(123)
    });

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
