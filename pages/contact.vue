<template>
  <div class="container">
      <div class="mt-0 md:mt-10">
        <ul class="flex items-center bg-zinc-100 md:bg-white pl-2 xl:pl-0">
          <li class="px-3 py-2 hover:bg-zinc-100 rounded hover:border hover:border-gray-200"><NuxtLink to="/">Home</NuxtLink></li>
          <li class="px-2"><i class="ec ec-arrow-right-categproes"></i></li>
          <li class="px-3 py-2 md:bg-zinc-100 hover:bg-gray-200 rounded md:border md:border-gray-100"><NuxtLink to="/contact">Contacts</NuxtLink></li>
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
                <InputField name="firstName" v-model="formDataContact.firstName" rules="required" label="First Name" placeholder="enter your first name" />
                <InputField name="lastName" v-model="formDataContact.lastName" rules="required" label="Last Name" placeholder="enter your last name" />
                <InputField name="phone" v-model="formDataContact.phone" rules="required|phone" label="Phone" placeholder="enter your phone number" />
                <InputField name="email" v-model="formDataContact.email" rules="required|email" label="Email" type="email" placeholder="enter your email address" />
                <InputField name="title" v-model="formDataContact.title" label="Title" rules="required" placeholder="title is...." :widthfull=true />
                <InputField name="message" v-model="formDataContact.content" label="Your Message" as="textarea" rows="5" class="rounded-lg" :isStrong=false placeholder="message..." :widthfull=true />
                <button type="submit" class="btn btn-primary bg-primary ml-4 py-3 px-8 mt-4 rounded-full font-bold shadow-sm hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)] hover:-translate-y-1 duration-300">
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
                Business Hours: <span class="hover:no-underline text-green-700 underline underline-offset-2">Mon - Sun: 09:30 AM - 06:00 PM</span>
              </p>
              <p class="mt-4 pb-5 text-justify leading-6">
                Dallas: 3112 N Jupiter Rd #317, Garland, Texas 75044<br>
                Support: <a href="tel:+1(214) 300-2000" class="underline underline-offset-2 text-green-700 hover:text-green-900 hover:no-underline">(214) 300-2000</a><br>
                Business Hours: <span class="hover:no-underline text-green-700 underline underline-offset-2">Mon - Sun: 10:00 AM - 06:00 PM</span>
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

  const formDataContact = ref({
    content: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    title: '',
  });

  const config = useRuntimeConfig();
  const apiUrl = config.public.apiBaseUrl;
  const notify = useNotify();
  const { handleSubmit, resetForm  } = useForm();

  const onSubmit = handleSubmit( async () => {
    
    try {
        await $fetch(`${apiUrl}comments/contact`, {
        method: 'POST',
        body: formDataContact.value,
        headers: { 'Content-Type': 'application/json' }
      });

      notify({
        message: 'Successfully! We will contact you soon.',
        type: 'success',
        time: 1500
      });
      resetForm();

    } catch(e: any) {
      notify({
        message: 'Error',
        type: 'error',
        time: 1000
      });
      console.error('form contac: ', e);
    }

  });
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
