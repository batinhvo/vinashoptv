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
                <div class="flex flex-wrap">               
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
                <div class="flex mb-10 px-3">
                    <button class="btn btn-primary bg-gray-700 py-2 px-10 rounded-full text-base text-white font-normal hover:shadow-[0_4px_11px_0_rgba(0,0,0,0.5)]">
                        Clear
                    </button>
                    <button class="btn btn-primary bg-primary py-2 px-10 ml-5 rounded-full text-base text-gray-22 font-normal hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)]">
                        Filter
                    </button>
                </div>
            </div>     
            
            <!-- table details -->
            <div class="bg-zinc-100 border border-gray-300 p-5 mt-5">
                <table class="w-full border border-gray-300 table-fixed">
                    <thead>
                        <tr class="h-14">
                            <th>Order ID</th>
                            <th>Order By</th>
                            <th>Order Status</th>
                            <th>Total</th>   
                            <th></th>                    
                        </tr>
                    </thead>
                    <tbody class="text-center">
                        <tr class="h-16 border border-gray-300">
                            <td class="border-r border-gray-200">
                                <span>#7518</span><br>
                                <span>(12/30/2024 18:51)</span>
                            </td>
                            <td class="border-r border-gray-200">Ba Tinh Vo</td>
                            <td class="border-r border-gray-200">pending</td>
                            <td class="border-r border-gray-200">$13.5567</td>
                            <td class="">
                                <button @click.prevent="OpenDetails" class="btn btn-primary bg-primary py-1.5 px-3 ml-5 rounded-full text-xs text-gray-22 font-normal hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)]">
                                    More Details
                                </button>
                            </td>                                                     
                        </tr>   
                          <!-- details -->
                        <tr class="bg-white h-16" :class="[isOpenDetails ? 'overflow-visible' : 'hidden']">
                            <td colspan="5">
                                <div class="py-2">
                                    <div class="font-bold py-2">Billing Information</div>
                                    <div class="flex flex-wrap items-center md:py-2">                                       
                                        <div class="w-full md:w-1/4 py-1">Ba Tinh</div>
                                        <div class="w-full md:w-2/4 py-1 border-x border-gray-200">9999 Bellaire Blvd., Suite 1111, Houston, TX 77036, HOUSTON, TX 78012</div>
                                        <div class="w-full md:w-1/4 py-1">8523697412</div>
                                    </div>
                                    <div class="font-bold py-2 border-t border-gray-200">Billing Information</div>
                                    <div class="flex flex-wrap items-center md:py-2">                                       
                                        <div class="w-full md:w-1/4 py-1">Ba Tinh</div>
                                        <div class="w-full md:w-2/4 py-1 border-x border-gray-200">9999 Bellaire Blvd., Suite 1111, Houston, TX 77036, HOUSTON, TX 78012</div>
                                        <div class="w-full md:w-1/4 py-1">8523697412</div>
                                    </div>
                                    <div class="py-3 border-t border-gray-200 font-bold">
                                        Order Note
                                    </div>
                                </div>
                            </td>                            
                        </tr>                                                                 
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const isOpenDetails = ref(false);

    const OpenDetails = () => {
        isOpenDetails.value = !isOpenDetails.value;
    }

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
