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
                  <InputField 
                    v-model="formDataSubmit.firstName"
                    name="firstName" label="First Name" rules="required" placeholder="enter your first name" />

                  <InputField 
                    v-model="formDataSubmit.lastName"
                    name="lastName" label="Last Name" rules="required" placeholder="enter your last name" />
                  
                  <InputField
                    v-model="formDataSubmit.email"
                    name="email" label="Email Address" rules="required|email|emailExist" type="email" placeholder="info@vinashoptv.com" />

                  <InputField 
                    v-model="formDataSubmit.phone"
                    name="phone" label="Phone Number" rules="required|phone" placeholder="(000) 000-0000" />
                  
                  <InputField 
                    v-model="formDataSubmit.password"
                    name="password" label="Password" rules="required" placeholder="********" type="password" />
                    
                  <InputField name="confPassword" v-model="confPassword" label="Confirm Password" rules="required|confirmed:@password" type="password" placeholder="********" />
                  <InputSelective name="state" label="State" v-model="formDataSubmit.state" rules="required" :options="stateOpt" placeholder="Select State" @selected="stateOnSelected" />
                  <InputSelective name="city" label="City" v-model="formDataSubmit.cityId" rules="required" :options="cityOpt" placeholder="Select City" @selected="cityOnSelected" />
                  <InputField name="postCode" v-model="formDataSubmit.zip" label="PostCode/Zip" rules="required" placeholder="9999" />
                  <InputField name="address" v-model="formDataSubmit.address" label="Street Address" rules="required" placeholder="123 street" />
                  <InputCheckBox name="angree" v-model="angree" widthfull rules="booRequired" :value="true" label="I agree to the Terms & Consditions." />
                  <InputCheckBox name="receiveEmail" v-model="formDataSubmit.receiveEmail" widthfull :isStrong="false" :value="true" label="Yes, I would like to receive emails about special promotions, events and exclusive offers." />
                  
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

  const confPassword = ref();
  const angree = ref(true);

  const formDataSubmit = ref({
    address: '',
    cityId: 0,
    country: 'US',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    phone: '',
    receiveEmail: false,
    state: '',
    zip: '',
  });

  const config = useRuntimeConfig();
  const apiUrl = config.public.apiBaseUrl;
  const notify = useNotify();
  const { handleSubmit, resetForm } = useForm();

  const onSubmit = handleSubmit( async () => {

    try {
      const postData = await $fetch(`${apiUrl}auth/register`, {
        method: 'POST',
        body: formDataSubmit.value,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      notify({
        message: 'Registered! Now you can use this account to login!',
        type: 'success',
        time: 2000
      });
      resetForm();

    } catch(e: any) {
      notify({
        message: 'Registration Error!!!',
        type: 'error',
        time: 1000
      });
      console.error('form contac: ', e);
    }
  });

  //--------------------------------API-------------------------------------//

  const stateStore = useStateStore();

  const stateOpt = computed(() => stateStore.states.map((state) => state.name));
  const cityOpt = computed(() => stateStore.cities.map((city) => city.name));

  const newStateSelect = ref<string>('');

  const stateOnSelected = (value: string) => {
    newStateSelect.value = value;
    formDataSubmit.value.state = stateStore.states.find((sta) => sta.name === value)?.code ?? '';

  }
  const cityOnSelected = (value: string) => {
    formDataSubmit.value.cityId = Number((stateStore.cities.find((city) => city.name === value)?.id)) || 0;
  }

  watch(newStateSelect, async (newState) => {
    const state = stateStore.states.find((state) => state.name === newState);
    if (state) {
      await stateStore.fetchCities(state.code); 
    } else {
      stateStore.resetCities();
    }
  });

  onMounted(async () => {
    await stateStore.fetchStates();
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
  