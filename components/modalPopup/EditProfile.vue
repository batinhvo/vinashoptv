<template>
    <form @submit.prevent="onSubmit">
        <div class="flex flex-wrap mt-6 max-w-[860px] bg-zinc-100 border border-zinc-200 py-3 px-1">
            <InputField v-model="formData.firstName" rules="required" name="firstName" label="Fist Name" :widthfull=false :isStrong=false />
            <InputField v-model="formData.lastName" rules="required" name="lastName" label="Last Name" :widthfull=false :isStrong=false />
            <InputField v-model="formData.email" rules="required|email" name="email" label="Email Address" type="email" :widthfull=false :isStrong=false />
            <InputField v-model="formData.phone" rules="required|phone" name="phone" type="number" label="Phone Number" :widthfull=false :isStrong=false />
            <InputSelective v-model="formData.state" name="state" label="State" :widthfull=true :isStrong=false :options="stateOpt" :placeholder="statePlaceholder" @selected="stateOnSelected" />
            <InputSelective v-model="formData.cityId" name="cityId" label="City" :options="cityOpt" :isStrong=false :placeholder="cityPlaceholder" @selected="cityOnSelected" />  
            <InputField v-model="formData.zip" name="zip" label="Postcode/Zip" type="number" :widthfull=false :isStrong=false />
            <InputField v-model="formData.address" rules="required" name="address" label="Street Address" :widthfull=true :isStrong=false />
        </div>
    </form>
</template>

<script setup lang="ts">
    import type { UserInfo } from 'types/userTypes';

    const info = defineProps<{
        userData: UserInfo,
        triggerSubmitProfile: boolean,
    }>();

    const formData = ref ({
        address: '', cityId: 0, firstName: '', lastName: '', email: '', phone: '', state: '', zip: 0, 
    });

    const notify = useNotify();
    const stateStore = useStateStore();
    const authStore = useAuthStore();

    const stateOpt = computed(() => stateStore.states.map((state) => state.name)); // khi giá trị thay đổi thì computed tự động cập nhật lại
    const cityOpt = computed(() => stateStore.cities.map((city) => city.name));

    const newStateSelect = ref<string>('');
    const statePlaceholder = ref('Select State');
    const cityPlaceholder = ref('Select City');

    const stateOnSelected = (value: string) => {
        newStateSelect.value = value;
        formData.value.state = stateStore.states.find((sta) => sta.name === value)?.code || '';
        cityPlaceholder.value = 'Select City';
    }
    
    const cityOnSelected = (value: string) => {
        formData.value.cityId = stateStore.cities.find((city) => city.name === value)?.id || 0;
    }

    const getNameState = async (valueState: string, valueCity: number) => {
        if (valueState) await stateStore.fetchCities(valueState); 
        formData.value.state = valueState;
        formData.value.cityId = valueCity;

        statePlaceholder.value = stateStore.states.find((state) => state.code === valueState)?.name || 'Select State';
        cityPlaceholder.value = stateStore.cities.find((city) => city.id === valueCity)?.name || 'Select City';
    }

    watch(newStateSelect, async (newState) => {
        const state = stateStore.states.find((state) => state.name === newState);
        if (state) {
            await stateStore.fetchCities(state.code); 
        } else {
            stateStore.resetCities();
        }
    });

    watchEffect(() => {
        if (info.userData) { 
            formData.value = { ...info.userData };
            getNameState(info.userData.state, info.userData.cityId);
        }
    });

    onMounted(async () => {
        await stateStore.fetchStates();
    });

    //----------------------------------------------------------------------

    // submit
    const emit = defineEmits()
    const { handleSubmit } = useForm();
    const onSubmit = handleSubmit( async () => {
        try {
            await authStore.updateProfileUser(formData.value);
            notify({
                message: 'Your profile has been updated successfully!',
                type: 'success',
                time: 2000,
            });
        } catch (error) {
            notify({
                message: 'Failed to update profile. Please try again!',
                type: 'error',
                time: 2000,
            });
        }
    });

    watch(() => info.triggerSubmitProfile, (newValue) => {
        if (newValue) {
            onSubmit()
        }
    });

</script>
