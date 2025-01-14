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
                  <InputField name="firstName" v-model="firstName" label="First Name" rules="required" placeholder="enter your first name" :widthfull=false />
                  <InputField name="lastName" v-model="lastName" label="Last Name" rules="required" placeholder="enter your last name" :widthfull=false />
                  <InputField name="email" v-model="email" label="Email Address" rules="required|email|emailExist" type="email" placeholder="info@vinashoptv.com" :widthfull=false />
                  <InputField name="phone" v-model="phone" label="Phone Number" rules="required|phone" placeholder="(000) 000-0000" :widthfull=false />
                  <InputField name="password" v-model="password" label="Password" rules="required" placeholder="********" type="password" :widthfull=false />
                  <InputField name="confPassword" v-model="confPassword" label="Confirm Password" rules="required|confirmed:@password" type="password" placeholder="********" :widthfull=false />

                  <InputField name="postCode" v-model="postCode" label="PostCode/Zip" rules="required" placeholder="9999" :widthfull=false />
                  <InputField name="address" v-model="address" label="Street Address" rules="required" placeholder="123 street" :widthfull=false />

                  <!-- check agree -->
                  <div class="w-full px-4 pb-5 flex flex-wrap items-center">                   
                    <div class="w-full">
                      <input id="agree" type="checkbox" class="accent-[#169100]">                    
                      <label for="agree" class="font-bold ml-2">I agree to the Terms & Conditions.</label>
                    </div>       
                    
                  </div>                      
                  
                  <!-- check receive email -->
                  <div class="w-full px-4 pb-5 flex items-center">                   
                    <input  id="receiveEmail" type="checkbox" class="accent-[#169100]">                    
                    <label for="receiveEmail" class="font-bold ml-2">Yes, I would like to receive emails about special promotions, events and exclusive offers.</label>
                      
                  </div>  


                  <button type="submit" class="btn btn-primary bg-primary ml-4 py-3 px-8 mt-4 rounded-full font-bold shadow-sm hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)] hover:-translate-y-1 duration-300">
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
  import { defineRule } from 'vee-validate';

  interface State {
    id: number;
    name: string;
  }

  const apiStore = useApiStore();
  const states = ref<State[]>([]);
  const stateSelected = ref(null);

  const loadStates = async () => {
    try {
      states.value = await apiStore.fetchStates() as State[];  // Ép kiểu dữ liệu
    } catch (error) {
      console.error('Error loading states:', error);
    }
  };

  onMounted(() => {
    loadStates();
  });

  //https://vinashoptv.com/api/v1/auth/check-email

  const firstName = ref('');
  const lastName = ref('');
  const email = ref('');
  const password = ref('');
  const confPassword = ref('');
  const phone = ref('');
  const postCode = ref('');
  const address = ref('');

  const mockApiRequest = (value: string | undefined) => {
      return new Promise((resolve) => {
          setTimeout(() => {
          resolve(value === 'test@example.com');
          }, 1000);
      });
  };

  defineRule('emailExist', async (value: string | undefined) : Promise<boolean|string> => {
      const result = await mockApiRequest(value);
      if(result) {
          return 'Email address already exists';
      }
      return true;
  });

  const { handleSubmit } = useForm();
  const onSubmit = handleSubmit(() => {
      alert(123)
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
  