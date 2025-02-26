<template>
    <form @submit.prevent="onSubmit">
        <div class="flex flex-wrap mt-6 max-w-[860px] bg-zinc-100 border border-zinc-200 py-3 px-1">
            <InputField v-model="formData.firstName" rules="required" name="firstName" label="Fist Name" :widthfull=false :isStrong=false />
            <InputField v-model="formData.lastName" rules="required" name="lastName" label="Last Name" :widthfull=false :isStrong=false />
            <InputField v-model="formData.email" rules="required|email" name="email" label="Email Address" type="email" :widthfull=false :isStrong=false />
            <InputField v-model="formData.phone" rules="required|phone" name="phone" type="number" label="Phone Number" :widthfull=false :isStrong=false />
            <InputSelective v-model="formData.state" name="state" label="State" rules="required" :widthfull=true :isStrong=false :options="stateOpt" placeholder="Select State" @selected="stateOnSelected" />
            <InputSelective v-model="formData.cityId" name="cityId" label="City" rules="required" :options="cityOpt" :isStrong=false placeholder="Select City" @selected="cityOnSelected" />  
            <InputField v-model="formData.zip" rules="required" name="zip" label="Postcode/Zip" type="number" :widthfull=false :isStrong=false />
            <InputField v-model="formData.address" rules="required" name="address" label="Street Address" :widthfull=true :isStrong=false />
        </div>
    </form>
</template>

<script setup lang="ts">
    import type { UserInfo } from 'types/userTypes';

    const info = defineProps<{
        userData: UserInfo,
    }>();

    const formData = ref ({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        state: '',
        cityId: 0,
        zip: 0,
        address: '',
    });

    const stateStore = useStateStore();

    const stateOpt = computed(() => stateStore.states.map((state) => state.name)); // khi giá trị thay đổi thì computed tự động cập nhật lại
    const cityOpt = computed(() => stateStore.cities.map((city) => city.name));

    const newStateSelect = ref<string>('');

    const stateOnSelected = (value: string) => {
        newStateSelect.value = value;

        console.log(newStateSelect.value);
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

    watchEffect(() => {
        if (info.userData && stateStore.states.length > 0) { 
            // Chỉ gán khi stateStore đã có dữ liệu
            formData.value = { ...info.userData };

            if (info.userData.state) {
                // Chuyển từ code → name
                const selectedState = stateStore.states.find((sta) => sta.code === info.userData.state);
                newStateSelect.value = selectedState ? selectedState.name : '';

                stateOnSelected(newStateSelect.value);
            }
        }
    });

    onMounted(async () => {
        await stateStore.fetchStates();
    });

    //----------------------------------------------------------------------

    //submit
    const emit = defineEmits();
    const { handleSubmit } = useForm();
    const onSubmit = handleSubmit(() => {
        //emit('submitEvent');
        alert(123)
    });

</script>
