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
                  <InputField name="firstName" v-model="formData.firstName" label="First Name" rules="required" placeholder="enter your first name" />
                  <InputField name="lastName" v-model="formData.lastName" label="Last Name" rules="required" placeholder="enter your last name" />
                  <InputField name="email" v-model="formData.email" label="Email Address" rules="required|email|emailExist" type="email" placeholder="info@vinashoptv.com" />
                  <InputField name="phone" v-model="formData.phone" label="Phone Number" rules="required|phone" placeholder="(000) 000-0000" />
                  <InputField name="password" v-model="formData.password" label="Password" rules="required" placeholder="********" type="password" />
                  <InputField name="confPassword" v-model="formData.confPassword" label="Confirm Password" rules="required|confirmed:@password" type="password" placeholder="********" />
                  <InputSelective name="state" label="State" v-model="formData.state" rules="required" :options="stateOpt" placeholder="Select State" @selected="stateOnSelected" />
                  <InputSelective name="city" label="City" v-model="formData.city" rules="required" :options="cityOpt" placeholder="Select City" @selected="cityOnSelected" />
                  <InputField name="postCode" v-model="formData.postCode" label="PostCode/Zip" rules="required" placeholder="9999" />
                  <InputField name="address" v-model="formData.address" label="Street Address" rules="required" placeholder="123 street" />

                  <InputCheckBox name="angree" v-model="formData.angree" widthfull label="I agree to the Terms & Consditions." />
                  <InputCheckBox name="receiveEmail" v-model="formData.receiveEmail" widthfull :isStrong="false" label="Yes, I would like to receive emails about special promotions, events and exclusive offers." />

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
 
  const formData = ref({
    state: '',
    city: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confPassword: '',
    phone: '',
    postCode: '',
    address: '',
    angree: false,
    receiveEmail: false,
  });

  const { handleSubmit } = useForm();
  const onSubmit = handleSubmit(() => {
      alert("submitting")
      console.log(formData.value)
  });

  //--------------------------------API-------------------------------------//

  const stateStore = useStateStore();

  const stateOpt = computed(() => stateStore.states.map((state) => state.name));
  const cityOpt = computed(() => stateStore.cities.map((city) => city.name));

  const newStateSelect = ref<string>('');

  const stateOnSelected = (value: string) => {
    newStateSelect.value = value;
  }
  const cityOnSelected = (value: string) => {
    console.log('Selected value:', value)
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
  