<template>
    <div class="container">
        <div class="mt-0 md:mt-10">
          <ul class="flex items-center bg-zinc-100 md:bg-white pl-2 xl:pl-0">
            <li class="px-3 py-2 hover:bg-zinc-100 rounded hover:border hover:border-gray-200"><a href="/">Home</a></li>
            <li class="px-2"><i class="ec ec-arrow-right-categproes"></i></li>
            <li class="px-3 py-2 md:bg-zinc-100 hover:bg-gray-200 rounded md:border md:border-gray-100"><a href="/user">My Profile</a></li>
          </ul>
        </div>
        <div class="my-10 px-5 xl:px-0">
            <h1 class="text-4xl font-normal pb-10 text-center">My Profile</h1>
            <div class="bg-zinc-100 border border-gray-300 shadow-lg p-2 md:p-5 mt-5 lg:mx-40 xl:mx-60">
                <table class="w-full border border-gray-300 ">                    
                    <tbody class="bg-white shadow-inner">         
                        <tr class="h-5"><td></td><td></td></tr>                
                        <tr class="h-10">                           
                            <td class="w-2/5 text-right pr-6 font-bold">Name :</td>
                            <td class="pl-6">Ba Tinh Vo</td>                                                                              
                        </tr>      
                        <tr class="h-10">                           
                            <td class="w-2/5 text-right pr-6 font-bold">Phone :</td>
                            <td class="pl-6">8523697412</td>                                                                              
                        </tr>    
                        <tr class="h-10">                           
                            <td class="w-2/5 text-right pr-6 font-bold">Email :</td>
                            <td class="pl-6">info@gmail.com</td>                                                                              
                        </tr>       
                        <tr class="h-10">                           
                            <td class="w-2/5 text-right pr-6 font-bold">State :</td>
                            <td class="pl-6">Texas</td>                                                                              
                        </tr>    
                        <tr class="h-10">                           
                            <td class="w-2/5 text-right pr-6 font-bold">City :</td>
                            <td class="pl-6">Houston</td>                                                                              
                        </tr>    
                        <tr class="h-10">                           
                            <td class="w-2/5 text-right pr-6 font-bold">Postcode/Zip :</td>
                            <td class="pl-6">78012</td>                                                                              
                        </tr>  
                        <tr class="h-10">                           
                            <td class="w-2/5 text-right pr-6 font-bold">Street address :</td>
                            <td class="pl-6">9999 Bellaire Blvd., Suite 1111, Houston, TX 77036</td>                                                                                                          
                        </tr>  
                        <tr class="h-5"><td></td><td></td></tr>  
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
