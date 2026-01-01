<template>
    <div v-if="isLoading" class="inset-0 flex flex-col items-center justify-center z-50"> 
        <div class="flex space-x-2">
            <span class="w-3 h-3 bg-green-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span class="w-3 h-3 bg-green-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span class="w-3 h-3 bg-green-600 rounded-full animate-bounce"></span>
        </div>
        <!-- <p class="mt-4 text-gray-700 font-medium text-lg">Loading</p> -->
        <div class="flex flex-wrap mt-6 min-w-[80vh] py-3 px-1"></div>
    </div>

    <div v-else>
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
                    v-model="locationUser.newCitySelect.value"      
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
    </div>
</template>

<script setup lang="ts">
    import type { UserInfo } from 'types/userTypes'; 

    const isLoading = ref(true);

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

    onMounted(async () => {
        await stateStore.fetchStates();
        //await authStore.getInfoUser();
        const user = authStore.userInfo;

        if (!user) return;

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

        // 4️⃣ sync UI
        locationUser.setStateAndCity(
            user.state ?? '',
            Number(user.cityId ?? 0)
        );

        setTimeout(() => {
            isLoading.value = false;
        }, 300);
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

<style lang="css" scoped>
    .title.border-b::after {
        content: ' ';
        height: 2px;
        width: 114px;
        display: block;
        background-color: #20d600;
        position: relative;
        bottom: -1px;
        left: 0;
    }

    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type="number"] {
        -moz-appearance: textfield;
        /* Ẩn trên Firefox */
        appearance: none;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 1s ease-in-out;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>
