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
                  <InputFieldInput 
                    v-model="formDataSubmit.firstName"
                    name="firstName" label="First Name" rules="required" placeholder="enter your first name" />

                  <InputFieldInput 
                    v-model="formDataSubmit.lastName"
                    name="lastName" label="Last Name" rules="required" placeholder="enter your last name" />
                  
                  <InputFieldInput
                    v-model="formDataSubmit.email"
                    name="email" label="Email Address" rules="required|email|emailExist" type="email" placeholder="info@vinashoptv.com" />

                  <InputFieldInput 
                    v-model="formDataSubmit.phone"
                    name="phone" label="Phone Number" rules="required|phone" placeholder="(000) 000-0000" />
                  
                  <InputFieldInput 
                    v-model="formDataSubmit.password"
                    name="password" label="Password" rules="required" placeholder="********" type="password" />
                    
                  <InputFieldInput
                    v-model="confPassword"
                    name="confPassword" label="Confirm Password" rules="required|confirmed:@password" type="password" placeholder="********" />
                    
                  <InputSelectiveInput             
                    v-model="location.newStateSelect.value"               
                    :options="location.stateOpt" 
                    :placeholder="location.statePlaceholder.value"
                    @selected="location.stateOnSelected" 
                    :widthfull=true 
                    name="state" label="State" class="lg:w-1/2 px-1"/>

                  <InputSelectiveInput 
                    :options="location.cityOpt" 
                    :placeholder="location.cityPlaceholder.value" 
                    @selected="location.cityOnSelected" 
                    name="city" label="City" class="lg:w-1/2 px-1"/>  

                  <InputFieldInput
                    v-model="formDataSubmit.zip"
                    name="postCode" label="PostCode/Zip" rules="required" placeholder="9999" />

                  <InputFieldInput 
                    v-model="formDataSubmit.address"
                    name="address" label="Street Address" rules="required" placeholder="123 street" />

                  <InputCheckBoxInput
                    v-model="angree"
                    :value="true"
                    :widthfull=true
                    name="angree" rules="booRequired" label="I agree to the Terms & Consditions." />

                  <InputCheckBoxInput
                    v-model="formDataSubmit.receiveEmail"
                    :widthfull=true
                    :isStrong="false"
                    :value="true"
                    name="receiveEmail" label="Yes, I would like to receive emails about special promotions, events and exclusive offers." />
                  
                  <button type="submit" class="btn btn-primary bg-primary ml-4 py-3 px-8 mt-4 rounded-full font-bold shadow-sm hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)] hover:-translate-y-1 duration-300">
                    Create Account
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
    location: { state: '', city: 0 },
    address: '',
    country: 'US',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    phone: '',
    receiveEmail: false,
    zip: '',
  });

  const location = useLocationSelect(formDataSubmit, 'location');

  const notify = useNotify();
  const authStore = useAuthStore();
  const { handleSubmit, resetForm } = useForm();

  const onSubmit = handleSubmit( async () => {
    try {
      const profileData = computed(() => ({
        ...formDataSubmit.value,
        state: formDataSubmit.value.location.state,
        cityId: Number(formDataSubmit.value.location.city),
      }));

      authStore.registerUser(profileData);
      resetForm();

      notify({
          message: 'Registered! Now you can use this account to login!',
          type: 'success',
          time: 2000
      });

    } catch (error) {
      notify({
        message: 'Registration Error!!!',
        type: 'error',
        time: 1000
      });
      console.error('form contac: ', error);
    }
  });

  //--------------------------------API-------------------------------------//

  const stateStore = useStateStore();

  onMounted(async () => {
      await stateStore.fetchStates();
      
      if (formDataSubmit.value.location.state && formDataSubmit.value.location.city) {
          location.setStateAndCity(
              formDataSubmit.value.location.state,
              Number(formDataSubmit.value.location.city)
          );
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
  