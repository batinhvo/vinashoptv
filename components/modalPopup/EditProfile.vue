<template>
    <form @submit.prevent="onSubmit">
        <div class="flex flex-wrap mt-6 max-w-[860px] bg-zinc-100 border border-zinc-200 py-3 px-1">
            <InputField v-model="firstName" rules="required" name="firstName" label="Fist Name" :widthfull=false :isStrong=false />
            <InputField v-model="lastName" rules="required" name="LastName" label="Last Name" :widthfull=false :isStrong=false />
            <InputField v-model="emailAddress" rules="required|email" name="emailAddress" label="Email Address" type="email" :widthfull=false :isStrong=false />
            <InputField v-model="phone" rules="required|phone" name="phone" label="Phone Number" :widthfull=false :isStrong=false />
            <InputSelective name="state" label="State" v-model="formData.stateDif" rules="required" :widthfull=true :options="stateOpt" placeholder="Select State" @selected="stateOnSelected" />
            <InputSelective name="city" label="City" v-model="formData.city" rules="required" :options="cityOpt" placeholder="Select City" @selected="cityOnSelected" />  
            <InputField v-model="postCode" rules="required" name="postCode" label="Postcode/Zip" :widthfull=false :isStrong=false />
            <InputField v-model="street" rules="required" name="street" label="Street Address" :widthfull=false :isStrong=false />
        </div>
    </form>
</template>

<script setup lang="ts">

    const formData = ref ({
        firstName: '',
        lastName: '',
        emailAddress: '',
        phone: '',
        state: '',
        city: '',
        postCode: '',
        street: '',
    });

    

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

    //submit
    const emit = defineEmits();
    const { handleSubmit } = useForm();
    const onSubmit = handleSubmit(() => {
        emit('submitEvent');
        alert(123)
    });

</script>
