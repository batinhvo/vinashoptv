<template>
    <div class="max-w-96">
        <div class="flex flex-col w-full justify-center items-center">
            <img src="/assets/images/logo-01.png" alt="Vinashop Logo" class="w-[200px] h-auto py-6">
            <h1 class="text-[#167000] text-4xl pb-5">Glad to have you!</h1>
            <p class="text-2xl text-center">Subscribe to receive a <span class="font-bold">discount</span> on your first order!</p> 
        </div>
        <div class="pt-5">
            <form @submit.prevent="onSubmit">
                <InputFieldInput
                    v-model="emailSubcribe"
                    name="emailSubcribe"
                    rules="required|email"
                    :widthfull="true"
                    :is-strong="false"
                />         
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">

    const notify = useNotify();
    const authStore = useAuthStore();

    const props = defineProps<{
        email?: string
        triggerSubmitSubscribeEmail: boolean
    }>()

    const emailSubcribe = ref('')

    watch(() => props.email, (newVal) => {
        if (newVal) {
            emailSubcribe.value = newVal
        }
    }, { immediate: true }) 

    // submit
    const emit = defineEmits()
    const { handleSubmit } = useForm();
    const onSubmit = handleSubmit( async () => {
        try {
            await authStore.subscribeEmail(emailSubcribe.value);
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

    watch(() => props.triggerSubmitSubscribeEmail, (newValue) => {
        if (newValue) {
            onSubmit()
        }
    });
</script>
