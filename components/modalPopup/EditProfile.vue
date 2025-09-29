<template>
    <form @submit.prevent="onSubmit">
        <div class="flex flex-wrap mt-6 max-w-[860px] bg-zinc-100 border border-zinc-200 py-3 px-1">
            <InputField 
                v-model="formData.firstName" 
                :widthfull=false 
                :isStrong=false 
                rules="required" name="firstName" label="Fist Name" />

            <InputField 
                v-model="formData.lastName" 
                :widthfull=false 
                :isStrong=false              
                rules="required" name="lastName" label="Last Name" />

            <InputField 
                v-model="formData.email" 
                :widthfull=false 
                :isStrong=false
                rules="required|email" name="email" label="Email Address" type="email" />

            <InputField 
                v-model="formData.phone" 
                :widthfull=false 
                :isStrong=false
                rules="required|phone" name="phone" label="Phone Number" />
            <InputSelective             
                v-model="location.newStateSelect.value"               
                :options="location.stateOpt" 
                :placeholder="location.statePlaceholder.value"
                @selected="location.stateOnSelected" 
                :widthfull=true 
                name="state" label="State" class="lg:w-1/2 px-1"/>

            <InputSelective 
                :options="location.cityOpt" 
                :placeholder="location.cityPlaceholder.value" 
                @selected="location.cityOnSelected" 
                name="city" label="City" class="lg:w-1/2 px-1"/>  

            <InputField 
                v-model="formData.zip" 
                :widthfull=false 
                :isStrong=false
                name="zip" type="number" label="Postcode/Zip"/>

            <InputField 
                v-model="formData.address" 
                :widthfull=true 
                :isStrong=false
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
        location: { state: '', city: 0 },
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

    watchEffect(() => {
        if (authStore.userInfo) {
            Object.assign(formData.value, {
                firstName: authStore.userInfo.firstName || "",
                lastName: authStore.userInfo.lastName || "",
                email: authStore.userInfo.email || "",
                phone: authStore.userInfo.phone || "",
                address: authStore.userInfo.address || "",
                zip: authStore.userInfo.zip || "",
            });

            formData.value.location = {
                state: authStore.userInfo.state || "",
                city: authStore.userInfo.cityId || 0,
            };
        }
    });

    const location = useLocationSelect(formData, 'location');

    onMounted(async () => {
        await Promise.all([
            stateStore.fetchStates(),
            authStore.getInfoUser(),
        ]);
       
        if (formData.value.location.state && formData.value.location.city) {
            location.setStateAndCity(
                formData.value.location.state,
                Number(formData.value.location.city)
            );
        }
    });

    //----------------------------------------------------------------------

    // submit
    const emit = defineEmits()
    const { handleSubmit } = useForm();
    const onSubmit = handleSubmit( async () => {
        try {          
           const profileData = computed(() => ({
            ...formData.value,
            state: formData.value.location.state,
            cityId: Number(formData.value.location.city),
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
