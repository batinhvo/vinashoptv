<template>
    <div class="max-w-96">
        <div class="flex flex-col w-full justify-center items-center">
            <img src="/assets/images/logo-01.png" alt="Vinashop Logo" class="w-[200px] h-auto py-6">
            <h1 class="text-[#167000] text-4xl pb-5">Glad to have you!</h1>
            <p class="text-2xl text-center">Subscribe to receive a <span class="font-bold">discount</span> on your first order!</p> 
        </div>
        <div class="pt-5">
            <form action="">
                <InputField name="subcribe" v-model="subcribe" rules="required|email" widthfull :is-strong="false" />              
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
    const authStore = useAuthStore();
    
    const subcribe = ref('');
    subcribe.value = authStore.userInfo?.email || 'aaa';

    console.log(authStore.userInfo)

    const { handleSubmit, resetForm  } = useForm();
</script>