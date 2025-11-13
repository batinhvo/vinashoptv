<template>
    <div class="container max-w-[1400px]">
        <div v-if="isLoading" class="fixed inset-0 bg-white/80 flex flex-col items-center justify-center z-50"> 
            <div class="flex space-x-2">
                <span class="w-3 h-3 bg-green-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span class="w-3 h-3 bg-green-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span class="w-3 h-3 bg-green-600 rounded-full animate-bounce"></span>
            </div>
            <p class="mt-4 text-gray-700 font-medium text-lg">Loading</p>
        </div>

        <div v-else>
            <div class="mt-0 md:mt-10">
                <ul class="flex items-center bg-zinc-100 md:bg-white pl-2 xl:pl-0">
                    <li class="px-3 py-2 hover:bg-zinc-100 rounded hover:border hover:border-gray-200">
                        <a href="/">Home</a>
                    </li>
                    <li class="px-2">
                        <i class="ec ec-arrow-right-categproes"></i>
                    </li>
                    <li class="px-3 py-2 md:bg-zinc-100 hover:bg-gray-200 rounded md:border md:border-gray-100">
                        <a href="/checkout">Reset Password</a>
                    </li>
                </ul>
            </div>

            <div class="container my-10 flex justify-center">
                <div class="bg-[#f5f5f5] px-8 py-6 rounded-lg border border-gray-300 max-w-[500px] ">                   
                    <div class="mt-5"> 
                        <h1 class="text-center text-4xl pb-5 font-bold">Reset Password</h1>
                        <h3 class="text-center text-xl font-normal pb-10">Your invoice currently being processed!</h3>
                    </div>
                    
                    <form @submit.prevent="onSubmit">
                        <div class="mt-6 py-3">                             
                            <InputField v-model="formData.password" rules="required|minLength:8" name="newPassword" label="New Password" type="password" widthfull :is-strong="false" placeholder="********"/>   
                            <InputField v-model="formData.confPassword" rules="required|confirmed:@newPassword" name="ConfPassword" label="Confirm Password" widthfull :is-strong="false" type="password" placeholder="********"/>             
                        </div>    

                        <div class="pb-10 text-center">                            
                            <button type="submit" class="in-top-3 btn btn-primary bg-primary py-2 px-5 lg:px-12 rounded-full text-base text-gray-22 font-normal hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)]">
                                Reset Password
                            </button>                            
                        </div> 
                    </form>   
                    
                </div>
                
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const { handleSubmit, errors, resetForm } = useForm();
    const isLoading = ref(true);
    const notify = useNotify();
    const $route = useRoute();
    const tokenId = $route.query.token as string;

    const authStore = useAuthStore();

    isLoading.value = false;

    const formData = ref({
        password: '',
        confPassword: '',
        token: tokenId,
    });

    const onSubmit = handleSubmit( async () => {
        try {
            authStore.resetPasswordUser(formData.value);         
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