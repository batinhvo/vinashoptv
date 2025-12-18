<template>
    <form @submit.prevent="onSubmit">
        <div class="flex flex-wrap mt-6 max-w-[860px] bg-zinc-100 border border-zinc-200 py-3 px-1">
            <InputField 
                v-model="formData.firstName" 
                :widthfull=false 
                :is-strong=false 
                rules="required" name="firstName" label="Fist Name" />

            <InputField 
                v-model="formData.lastName" 
                :widthfull=false 
                :is-strong=false              
                rules="required" name="lastName" label="Last Name" />

            <InputField 
                v-model="formData.email" 
                :widthfull=false 
                :is-strong=false
                rules="required|email" name="email" label="Email Address" type="email" disabled/>

            <InputField 
                v-model="formData.phone" 
                :widthfull=false 
                :is-strong=false
                rules="required|phone" name="phone" label="Phone Number" />

            <InputSelective             
                v-model="locationUser.newStateSelect.value"               
                :options="locationUser.stateOpt" 
                :placeholder="locationUser.statePlaceholder.value"
                @selected="locationUser.stateOnSelected" 
                rules="stateSelect"
                :widthfull=true 
                isSearch                                    
                name="state" label="State" class="lg:w-1/2 px-1"/>

            <InputSelective 
                :options="locationUser.cityOpt" 
                :placeholder="locationUser.cityPlaceholder.value"                                     
                isSearch
                @selected="locationUser.cityOnSelected" 
                rules="citySelect"
                name="city" label="City" class="lg:w-1/2 px-1"/>

            <InputField 
                v-model="formData.zip" 
                :widthfull=false 
                :is-strong=false
                name="zip" type="number" rules="zipcode" label="Postcode/Zip"/>

            <InputField 
                v-model="formData.address" 
                :widthfull=true 
                :is-strong=false
                rules="required" name="address" label="Street Address" />
        </div>
    </form>
</template>

<script setup lang="ts">
    import type { UserInfo } from 'types/userTypes'; 

    const info = defineProps<{
        userData: UserInfo | null,
        triggerSubmitProfile: boolean,
    }>();

    const formData = ref({
        locaUser: { state: '', city: 0 },
        address: '',
        country: 'US',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        zip: '',
    });

    const notify = useNotify();
    const stateStore = useStateStore();
    const authStore = useAuthStore();

    const locationUser = useLocationSelect(formData, 'locaUser');

    watch(
        () => authStore.userInfo,
        async (user) => {
            if (!user) return;

            await stateStore.fetchStates();

            Object.assign(formData.value, {
                firstName: user.firstName ?? '',
                lastName: user.lastName ?? '',
                email: user.email ?? '',
                phone: user.phone ?? '',
                address: user.address ?? '',
                zip: user.zip ?? '',
            });

            formData.value.locaUser.state = user.state ?? '';
            formData.value.locaUser.city = Number(user.cityId ?? 0);

            locationUser.setStateAndCity(formData.value.locaUser.state, Number(formData.value.locaUser.city));
        },
        { immediate: true }
    );

    onMounted(async () => {
        await Promise.all([
            stateStore.fetchStates(),
            authStore.getInfoUser(),
        ]);
    });

    //----------------------------------------------------------------------

    // submit
    const emit = defineEmits()
    const { handleSubmit } = useForm();
    const onSubmit = handleSubmit( async () => {
        try {          
           const profileData = computed(() => ({
            ...formData.value,
            state: formData.value.locaUser.state,
            cityId: Number(formData.value.locaUser.city),
            }));

            // onSubmit
            await authStore.updateProfileUser(profileData.value);
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
