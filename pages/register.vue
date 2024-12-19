<template>
    <div class="container max-w-[1400px]">
        <div class="mt-0 md:mt-10">
          <ul class="flex items-center bg-zinc-100 md:bg-white pl-2 xl:pl-0">
            <li class="px-3 py-2 hover:bg-zinc-100 rounded hover:border hover:border-gray-200"><a href="/">Home</a></li>
            <li class="px-2"><i class="ec ec-arrow-right-categproes"></i></li>
            <li class="px-3 py-2 md:bg-zinc-100 hover:bg-gray-200 rounded md:border md:border-gray-100"><a href="register">Register</a></li>
          </ul>
        </div>
        <div class="container my-10">
          <h1 class="text-center text-4xl font-normal pb-10">Register</h1>
          <div class="flex flex-wrap">
            <!-- content-left -->
            <div class="w-full">
              <div class="px-4">
                <div class="border-b border-gray-300">
                  <h3 class="text-2xl pb-2">Create an Account!</h3>
                </div>
              </div>
              <!-- form -->
              <form @submit.prevent="onSubmit">
                <div class="flex flex-wrap mt-8">
                  <!-- first name -->
                  <div class="w-full md:w-1/2 px-4 pb-5">
                    <label for="firstName" class="font-bold">First Name </label>
                    <input v-model="formData.firstName" id="firstName" type="text" placeholder="enter your first name"
                     class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm focus:outline-none focus:border-blue-300 disabled:bg-zinc-50 
                     disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                     :class="[errors.firstName? 'border-red-500' : 'border-gray-300']">
                    <p class="text-red-600 text-xs text-center" v-if="errors.firstName">{{ errors.firstName }}</p>
                  </div>              
  
                  <!-- last name -->
                  <div class="w-full md:w-1/2 px-4 pb-5">
                    <label for="lastName" class="font-bold">Last Name </label>
                    <input v-model="formData.lastName" id="lastName" type="text" placeholder="enter your last name"
                      class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm focus:outline-none focus:border-blue-300 disabled:bg-zinc-50 
                      disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                      :class="[errors.lastName? 'border-red-500' : 'border-gray-300']">
                      <p class="text-red-600 text-xs text-center" v-if="errors.lastName">{{ errors.lastName }}</p>
                  </div>                               
  
                  <!-- email -->
                  <div class="w-full md:w-1/2 px-4 pb-5">
                    <label for="email" class="font-bold">Email Address</label>
                    <input v-model="formData.email" id="email" type="email" placeholder="info@vinashoptv.com"
                      class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm focus:outline-none focus:border-blue-300 disabled:bg-zinc-50 
                      disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                      :class="[errors.email? 'border-red-500' : 'border-gray-300']">
                      <p class="text-red-600 text-xs text-center" v-if="errors.email">{{ errors.email }}</p>
                  </div>        

                  <!-- phone -->
                  <div class="w-full md:w-1/2 px-4 pb-5">
                    <label for="phone" class="font-bold">Phone Number</label>
                    <input v-model="formData.phone" id="phone" type="text" class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm 
                      focus:outline-none focus:border-blue-300 disabled:bg-zinc-50 disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                      :class="[errors.phone? 'border-red-500' : 'border-gray-300']">
                      <p class="text-red-600 text-xs text-center" v-if="errors.phone">{{ errors.phone }}</p>
                  </div>                         
                  
                  <!-- password -->
                  <div class="w-full md:w-1/2 px-4 pb-5">
                    <label for="password" class="font-bold">Password</label>
                    <input v-model="formData.password" id="password" type="password" placeholder="********"
                      class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm focus:outline-none focus:border-blue-300 disabled:bg-zinc-50 
                      disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                      :class="[errors.password? 'border-red-500' : 'border-gray-300']">
                      <p class="text-red-600 text-xs text-center" v-if="errors.password">{{ errors.password }}</p>
                  </div>        

                  <!-- confirm-password -->
                  <div class="w-full md:w-1/2 px-4 pb-5">
                    <label for="confirmPassword" class="font-bold">Confirm Password</label>
                    <input v-model="formData.confirmPassword" id="confirmPassword" type="password" placeholder="********"
                      class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm focus:outline-none focus:border-blue-300 disabled:bg-zinc-50 
                      disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                      :class="[errors.confirmPassword? 'border-red-500' : 'border-gray-300']">
                      <p class="text-red-600 text-xs text-center" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</p>
                  </div>                 
  
                  <!-- State -->
                  <div class="w-full px-4 pb-5">
                    <label for="state" class="font-bold">State</label>
                    <select v-model="formData.state" id="state" type="text" placeholder="Select State"
                    class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm appearance-none focus:outline-none focus:border-blue-300 disabled:bg-zinc-50
                      disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                      :class="[errors.state? 'border-red-500' : 'border-gray-300']">
                      <option>123</option>
                      <option>123</option>
                    </select>                   
                      <p class="text-red-600 text-xs text-center" v-if="errors.state">{{ errors.state }}</p>
                  </div>     
                  
                   <!-- City -->
                   <div class="w-full md:w-1/2 px-4 pb-5">
                    <label for="city" class="font-bold">City </label>
                    <input v-model="formData.city" id="city" type="text" placeholder="Select City"
                     class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm focus:outline-none focus:border-blue-300 disabled:bg-zinc-50 
                     disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                     :class="[errors.city? 'border-red-500' : 'border-gray-300']">
                    <p class="text-red-600 text-xs text-center" v-if="errors.city">{{ errors.city }}</p>
                  </div>              
  
                  <!-- PostCode/Zip -->
                  <div class="w-full md:w-1/2 px-4 pb-5">
                    <label for="postCode" class="font-bold">PostCode/Zip </label>
                    <input v-model="formData.postCode" id="postCode" type="text" placeholder="9999"
                      class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm focus:outline-none focus:border-blue-300 disabled:bg-zinc-50 
                      disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                      :class="[errors.postCode? 'border-red-500' : 'border-gray-300']">
                      <p class="text-red-600 text-xs text-center" v-if="errors.postCode">{{ errors.postCode }}</p>
                  </div>         

                  <!-- Street Address -->
                  <div class="w-full px-4 pb-5">
                    <label for="address" class="font-bold">Address</label>
                    <input v-model="formData.address" id="address" type="text" placeholder="123 Street"
                    class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm appearance-none focus:outline-none focus:border-blue-300 disabled:bg-zinc-50
                      disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                      :class="[errors.address? 'border-red-500' : 'border-gray-300']">                   
                      <p class="text-red-600 text-xs text-center" v-if="errors.address">{{ errors.address }}</p>
                  </div>     

                  <!-- check agree -->
                  <div class="w-full px-4 pb-5 flex flex-wrap items-center">                   
                    <div class="w-full">
                      <input v-model="formData.agree" id="agree" type="checkbox" class="accent-green-500 focus:ring-green-400">                    
                      <label for="agree" class="font-bold ml-2">I agree to the Terms & Conditions.</label>
                    </div>       
                    <div class="text-red-600 text-xs text-center pl-5" v-if="errors.agree">{{ errors.agree }}</div>            
                  </div>                      
                  
                  <!-- check receive email -->
                  <div class="w-full px-4 pb-5 flex items-center">                   
                    <input v-model="formData.receiveEmail" id="receiveEmail" type="checkbox" class="accent-green-500 focus:ring-green-400 text-white">                    
                    <label for="receiveEmail" class="font-bold ml-2">Yes, I would like to receive emails about special promotions, events and exclusive offers.</label>
                      <p class="text-red-600 text-xs text-center" v-if="errors.receiveEmail">{{ errors.receiveEmail }}</p>
                  </div>  


                  <button type="submit" :disabled="isSubmitting" class="btn btn-primary bg-primary ml-4 py-3 px-8 mt-4 rounded-full font-bold shadow-sm hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)] hover:-translate-y-1 duration-300">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
    </div>
  </template>
  
  <script setup lang="ts">
      //check form
      const { formData, errors, isSubmitting, onSubmit } = useformRegister();
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
  