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
            <div class="flex flex-wrap bg-zinc-100 border border-gray-300 px-6 pt-8">               
                <div class="w-full md:w-1/2 px-3 pb-10">
                    <!-- Order From -->               
                    <label for="orderFrom" class="font-bold">Order From</label>
                    <input id="orderFrom" type="date" class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm
                    focus:outline-none focus:border-blue-300 disabled:bg-zinc-50 disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                    >
                    <p class="text-red-600 text-xs text-left pl-6" ></p>                
                </div>
                <div class="w-full md:w-1/2 px-3 pb-10">
                    <!-- Order To -->               
                    <label for="orderTo" class="font-bold">Order To</label>
                    <input id="orderTo" type="date" class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm
                    focus:outline-none focus:border-blue-300 disabled:bg-zinc-50 disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                    >
                    <p class="text-red-600 text-xs text-left pl-6" ></p>                
                </div>
                <div class="w-full md:w-1/2 px-3 pb-10">
                    <!-- Phone -->               
                    <label for="phone" class="font-bold">Phone</label>
                    <input id="phone" type="number" placeholder="enter phone number" class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm
                    focus:outline-none focus:border-blue-300 disabled:bg-zinc-50 disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                    >
                    <p class="text-red-600 text-xs text-left pl-6" ></p>                
                </div>
                <div class="w-full md:w-1/2 px-3 pb-10">
                    <!-- Phone Number Of -->               
                    <label for="phoneOf" class="font-bold">Phone Number Of</label>
                    <BodyCheckoutInputSelect
                    id="phoneOf"
                    :options="PhoneOpt"
                    :activeDropdownId="activeDropdownId"
                    :defaultOption="phoneOfSelected"
                    @update:selectedOption="setPhoneOf"
                    @update:activeDropdownId="setActiveDropdownId"/>
                    <p class="text-red-600 text-xs text-left pl-6" ></p>                
                </div>
                <div class="w-full md:w-1/2 px-3 pb-10">
                    <!-- Order Status -->               
                    <label for="statusOrder" class="font-bold">Order Status</label>
                    <BodyCheckoutInputSelect
                    id="statusOrder"
                    :options="statusOpt"
                    :activeDropdownId="activeDropdownId"
                    :defaultOption="statusSelected"
                    @update:selectedOption="setStatus"
                    @update:activeDropdownId="setActiveDropdownId"/>
                    <p class="text-red-600 text-xs text-left pl-6" ></p>                
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const activeDropdownId = ref('');
    const phoneOfSelected = ref('Shipping');
    const statusSelected = ref('Pending');

    const PhoneOpt = ['Shipping', 'Billing'];
    const statusOpt = ['All', 'Unable', 'Pending', 'Shipped', 'Cancelled', 'Returned'];

    function setActiveDropdownId(id: string) {
        activeDropdownId.value = id;
    }
    function setPhoneOf(PhoneOpt: string) {
        phoneOfSelected.value = PhoneOpt;
    }
    function setStatus(statusOpt: string) {
        statusSelected.value = statusOpt;
    }
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
