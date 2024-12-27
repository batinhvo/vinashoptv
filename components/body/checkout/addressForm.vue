<template>
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
</template>

<script setup lang="ts">
    //check form
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