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
                        <InputField
                            v-model="formData.orderFrom"
                            :is-strong=false
                            name="orderFrom" label="Order From" type="date" />

                        <InputField
                            v-model="formData.orderTo" 
                            :is-strong=false
                            name="orderTo" label="Order To" type="date"/>

                        <InputField 
                            v-model="formData.phone"
                            :is-strong=false
                            name="phone" label="Phone" rules="phone" placeholder="enter phone number" />

                        <InputSelective
                            v-model="formData.phoneOf"
                            :options="PhoneOpt"
                            :is-strong=false
                            name="phoneOf" label="Phone Number Of" placeholder="Nothing Selected"/>  

                        <InputSelective
                            v-model="formData.statusOrder"
                            :options="statusOpt"
                            :is-strong=false
                            name="statusOrder"
                            label="Order Status"
                            placeholder="Pending"
                        />                                                    
                    </div>
                    <div class="flex mb-10 px-3">
                        <button @click.prevent="clearForm()" class="btn btn-primary bg-gray-700 py-2 px-10 rounded-full text-base text-white font-normal hover:shadow-[0_4px_11px_0_rgba(0,0,0,0.5)]">
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

                <div v-for="order in orderStore.orderData" :key="order.id">
                    <div class="border border-gray-300 flex flex-wrap text-center py-3 items-center">
                    <div class="w-1/4 lg:w-1/5 border-r border-gray-200">
                        <span>#{{ order.id }}</span><br>
                        <span>{{ formatTimestamp(order.createdAt) }}</span>
                    </div>
                    <div class="w-1/4 lg:w-1/5 py-3 border-r border-gray-200">{{ order.billingFirstName + ' ' + order.billingLastName }}</div>
                    <div class="w-1/4 lg:w-1/5 py-3 border-r border-gray-200">{{ order.status }}</div>
                    <div class="w-1/4 lg:w-1/5 py-3 border-r border-gray-200">${{ order.grandTotal }}</div>
                        <div class="lg:w-1/5 lg:block hidden">
                            <button @click.prevent="toggleDetails(order.id)" class="btn btn-primary bg-primary py-1.5 px-3 rounded-full text-xs text-gray-22 font-normal hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)]">
                                More Details
                            </button>
                        </div>
                    </div>

                    <div class="w-full text-center border border-gray-300 py-3 lg:hidden">
                        <button @click.prevent="toggleDetails(order.id)" class="btn btn-primary bg-primary py-1.5 px-3 rounded-full text-xs text-gray-22 font-normal hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)]">
                            More Details
                        </button>
                    </div>

                    <div class="bg-white" :class="openOrderId === order.id ? 'overflow-visible' : 'hidden'">
                        <div class="text-center border border-gray-300">
                            <BodyOrderBillingInfo :order="order" />
                        </div>
                    </div>          
                </div>
            </div>

            <BodyProductPaginationOfOrderHistory v-if="orderStore.orderCount > 8" 
                :dataTotal="orderStore.orderCount" 
                :updateSort="isUpdateSort" 
                @updatePages="updatePages" 
                @updateRange="rangeChange" 
                @resetUpdateSort="isUpdateSort = false"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { OrderFilter } from 'types/orderTypes';

    definePageMeta({middleware: 'auth-middle'});

    const PhoneOpt = ['Shipping', 'Billing'];
    const statusOpt = ['All', 'Unable', 'Pending', 'Shipped', 'Cancelled', 'Returned'];

    const authStore = useAuthStore();
    const orderStore = useOrderStore();
    const config = useRuntimeConfig();
    const notify = useNotify();

    const openOrderId = ref<number | null>(null);
    const orderCount = ref(0);
    const isUpdateSort = ref(false);
    const fromShow = ref(1);
    const toShow = ref(1);

    const formData = ref<OrderFilter>({
        phoneOf: '',
        statusOrder: '',
        orderFrom: '',
        orderTo: '',
        phone: '',
    });

    const toggleDetails = (id: number) => {
        openOrderId.value = openOrderId.value === id ? null : id;
    };

    const rangeChange = ({ from, to }: { from: number; to: number }) => {
        fromShow.value = from;
        toShow.value = to; 
    }

    const fetchDataOrderHistory = async (query: string) => {       
        await orderStore.fetchOrders(query);
        orderCount.value = orderStore.orderCount || 0;
    }

    const updatePages = async (page: number) => {
        const query = new URLSearchParams();
        query.append('page', page.toString());
        query.append('perPage', '8');
        await fetchDataOrderHistory(query.toString());
    };

    // Hàm chuyển timestamp mili sang string dạng (MM/DD/YYYY HH:mm)
    function formatTimestamp(timestamp: number): string {
        const date = new Date(timestamp);
        const pad = (n: number) => n.toString().padStart(2, '0');
        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1); // tháng bắt đầu từ 0
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        return `(${month}/${day}/${year} ${hours}:${minutes})`;
    }

    const clearForm = () => {
        formData.value = {
            phoneOf: '',
            statusOrder: '',
            orderFrom: '',
            orderTo: '',
            phone: '',
        };
    };

    const { handleSubmit } = useForm();
    const onSubmit = handleSubmit(async () => {
        const { orderFrom, orderTo, phone, phoneOf, statusOrder } = formData.value;

        const params = new URLSearchParams();
        if (orderFrom) params.append('from', orderFrom);
        if (orderTo)   params.append('to', orderTo);
        if (statusOrder && statusOrder !== 'All') params.append('status', statusOrder.toLowerCase());
        if (phone)     params.append('phone', phone);
        if (phoneOf)   params.append('phoneOf', phoneOf.toLowerCase());

        params.append('page', '1');
        params.append('perPage', '8');

        try {
            const query = params.toString();
            await fetchDataOrderHistory(query);
            if(orderStore.orderCount === 0) {
                notify({
                    message: 'No matching results found, please check again!',
                    type: 'warning',
                    time: 8000,
                });   
            }  
        } catch (err) {
            console.error(err);           
        }
    });

    onMounted(async () => {
        if (authStore.authenticated) {
            await fetchDataOrderHistory(config.public.paramsOrderHistory);
        }
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
