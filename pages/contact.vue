<template>
  <div class="container">
      <div class="mt-0 md:mt-10">
        <ul class="flex items-center bg-zinc-100 md:bg-white pl-2 xl:pl-0">
          <li class="px-3 py-2 hover:bg-zinc-100 rounded hover:border hover:border-gray-200"><a href="/">Home</a></li>
          <li class="px-2"><i class="ec ec-arrow-right-categproes"></i></li>
          <li class="px-3 py-2 md:bg-zinc-100 hover:bg-gray-200 rounded md:border md:border-gray-100"><a href="contact">Contacts</a></li>
        </ul>
      </div>
      <div class="container my-10">
        <h1 class="text-center text-4xl font-normal pb-10">Contact Us</h1>
        <div class="flex flex-wrap">
          <!-- content-left -->
          <div class="w-full lg:w-1/2 lg:pr-4 xl:pr-8">
            <div class="px-4">
              <div class="border-b border-gray-300">
                <h3 class="text-2xl pb-2">Leave us a Message</h3>
              </div>
              <p class="mt-8 pb-5 text-justify">Thank you for visiting our website. If you have any questions, comments, or feedback, please leave us a message below. We will get back to you as soon as possible.</p>
              <p>Have a great day!</p>
            </div>
            <!-- form -->
            <form @submit.prevent="onSubmit">
              <div class="flex flex-wrap mt-8">
                <!-- first name -->
                <div class="w-full md:w-1/2 px-4 pb-5">
                  <label for="firstName" class="font-bold">First Name<span class="text-red-500"> *</span></label>
                  <input v-model="formData.firstName" id="firstName" type="text" class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm
                    focus:outline-none focus:border-blue-300 disabled:bg-zinc-50 disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                    :class="[errors.firstName? 'border-red-500' : 'border-gray-300']">
                  <p class="text-red-600 text-xs text-center" v-if="errors.firstName">{{ errors.firstName }}</p>
                </div>              

                <!-- last name -->
                <div class="w-full md:w-1/2 px-4 pb-5">
                  <label for="lastName" class="font-bold">Last Name<span class="text-red-500"> *</span></label>
                  <input v-model="formData.lastName" id="lastName" type="text" class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm 
                    focus:outline-none focus:border-blue-300 disabled:bg-zinc-50 disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                    :class="[errors.lastName? 'border-red-500' : 'border-gray-300']">
                    <p class="text-red-600 text-xs text-center" v-if="errors.lastName">{{ errors.lastName }}</p>
                </div>                               

                <!-- phone -->
                <div class="w-full md:w-1/2 px-4 pb-5">
                  <label for="phone" class="font-bold">Phone<span class="text-red-500"> *</span></label>
                  <input v-model="formData.phone" id="phone" type="text" class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm 
                    focus:outline-none focus:border-blue-300 disabled:bg-zinc-50 disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                    :class="[errors.phone? 'border-red-500' : 'border-gray-300']">
                    <p class="text-red-600 text-xs text-center" v-if="errors.phone">{{ errors.phone }}</p>
                </div>                

                <!-- email -->
                <div class="w-full md:w-1/2 px-4 pb-5">
                  <label for="email" class="font-bold">Email</label>
                  <input v-model="formData.email" id="email" type="email" class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm 
                    focus:outline-none focus:border-blue-300 disabled:bg-zinc-50 disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                    :class="[errors.email? 'border-red-500' : 'border-gray-300']">
                    <p class="text-red-600 text-xs text-center" v-if="errors.email">{{ errors.email }}</p>
                </div>              

                <!-- address -->
                <div class="w-full px-4 pb-5">
                  <label for="address" class="font-bold">Address</label>
                  <input v-model="formData.address" id="address" type="text" class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm 
                    focus:outline-none focus:border-blue-300 disabled:bg-zinc-50 disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                    :class="[errors.address? 'border-red-500' : 'border-gray-300']">
                    <p class="text-red-600 text-xs text-center" v-if="errors.address">{{ errors.address }}</p>
                </div>               

                <!-- message -->
                <div class="w-full px-4 pb-5">
                  <label for="message" class="font-bold">Your Message</label>
                  <textarea v-model="formData.message" id="message" rows="4" class="mt-2.5 p-8 border rounded-2xl w-full shadow-sm border-gray-300
                    focus:outline-none focus:border-blue-300 disabled:bg-zinc-50 disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                  ></textarea>
                </div>                

                <button type="submit" :disabled="isSubmitting" class="btn btn-primary bg-primary ml-4 py-3 px-8 mt-4 rounded-full font-bold shadow-sm hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)] hover:-translate-y-1 duration-300">
                  Send Message
                </button>
              </div>
            </form>
          </div>

          <!-- right-content -->
          <div class="w-full lg:w-1/2 lg:pl-4 xl:pl-8 mt-10 lg:mt-0">
            <div class="w-full mb-8">
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6931.070440062699!2d-95.57806700000002!3d29.704252000000004!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640dd3c8ea0a611%3A0xe3583796efa578f0!2sVINASHOP!5e0!3m2!1sen!2sus!4v1734080221890!5m2!1sen!2sus" width="100%" height="300" style="border:0;" allowfullscreen="true" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div class="px-4">
              <div class="border-b border-gray-300">
                <h3 class="text-2xl pb-2">Our Address</h3>
              </div>
              <p class="mt-8 pb-5 text-justify leading-6">
                Houston: 11322 Bellaire Blvd, Suite 111, Houston, TX - 77072, USA<br>
                Support: <a href="tel:+1(281) 619-5000" class="underline underline-offset-2 text-green-700 hover:text-green-900 hover:no-underline">(281) 619-5000</a><br>
                Business Hours: <span class="underline-offset-2 hover:no-underline text-green-700 underline underline-offset-2">Mon - Sun: 09:30 AM - 06:00 PM</span>
              </p>
              <p class="mt-4 pb-5 text-justify leading-6">
                Dallas: 3112 N Jupiter Rd #317, Garland, Texas 75044<br>
                Support: <a href="tel:+1(214) 300-2000" class="underline underline-offset-2 text-green-700 hover:text-green-900 hover:no-underline">(214) 300-2000</a><br>
                Business Hours: <span class="underline-offset-2 hover:no-underline text-green-700 underline underline-offset-2">Mon - Sun: 10:00 AM - 06:00 PM</span>
              </p>
              <p class="mt-4 pb-5">             
                Email: <a href="mailto:info@vinashoptv.com" class="underline underline-offset-2 text-green-700 hover:text-green-900 hover:no-underline">Info@vinashoptv.com</a>                
              </p>
            </div>

          </div>


        </div>
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
