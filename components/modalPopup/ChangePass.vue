<template>
    <form @submit.prevent="onSubmit">
        <div class="flex flex-wrap mt-6 max-w-[860px] bg-zinc-100 border border-zinc-200 py-3 px-1">
            <InputField v-model="formData.currentPassword" rules="required|minLength:8" name="password" label="Current Password" type="password" widthfull :is-strong="false" placeholder="********"/>
            <InputField v-model="formData.newPassword" rules="required|minLength:8" name="newPassword" label="New Password" type="password" widthfull :is-strong="false" placeholder="********"/>   
            <InputField v-model="formData.confPassword" rules="required|confirmed:@newPassword" name="ConfPassword" label="Confirm Password" widthfull :is-strong="false" type="password" placeholder="********"/>             
        </div>    
    </form>
</template>

<script setup lang="ts">

    const formData = ref({
        currentPassword: '',
        newPassword: '',
        confPassword: '',
    });

    const info = defineProps<{
        triggerSubmitChangePass: boolean,
    }>();

    const notify = useNotify();
    const authStore = useAuthStore();
    const { handleSubmit } = useForm();
    const emit = defineEmits(['submitSuccess']);

    const onSubmit = handleSubmit( async () => {
        try {
            authStore.updatePasswordUser(formData.value);    
            emit('submitSuccess');
            authStore.logOut();     
            notify({
                message: 'Your password has been updated successfully. Please log in again!',
                type: 'success',
                time: 3000,
            });   
        } catch (error) {
            notify({
                message: 'Failed to update password. Please try again!',
                type: 'error',
                time: 2000,
            });
        }
    });

    watch(() => info.triggerSubmitChangePass, (newValue) => {
        if (newValue) {
            onSubmit();
        }
    }, { immediate: true });

</script>
