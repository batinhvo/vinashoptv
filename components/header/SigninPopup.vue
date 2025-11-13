<template>
    <div class="px-8 py-4" v-if="!isForgotpass">
        <div class="text-center mb-12">
            <h2 class="text-2xl">Welcome Back!</h2>
            <p class="text-neutral-500">Login to manage your account.</p>
        </div>
        <form @submit.prevent="onSubmit">
            <div class="flex">
                <div class="border rounded-l-full border-r-0 py-3 px-5 shadow-sm">
                    <i class="text-xs text-zinc-400 fa fa-user"></i>                  
                </div>
                <div class="w-full">
                    <Field v-model="formData.email" id="email" name="email" rules="required|email" type="email" placeholder="Email" 
                    class="py-3 px-5 border rounded-r-full w-full placeholder-zinc-400 shadow-sm focus:outline-none focus:border-blue-300 "
                    :class="[ emailError ? 'border-red-500' : 'border-gray-300']"/>                  
                </div>               
            </div>
            <ErrorMessage name="email" class="text-red-500 mt-2 text-xs pl-4 w-full"/>

            <div class="flex mt-4">
                <div class="border rounded-l-full border-r-0 py-3 px-5 shadow-sm">
                    <i class="text-xs text-zinc-400 fa fa-lock"></i>
                </div>
                <div class="w-full">
                    <Field v-model="formData.password" id="password" name="password" rules="required" type="password" placeholder="Password" 
                    class="py-3 px-5 border rounded-r-full w-full placeholder-zinc-400 shadow-sm focus:outline-none focus:border-blue-300"
                    :class="[ passError ? 'border-red-500' : 'border-gray-300']"/>                  
                </div>               
            </div>
            <ErrorMessage name="password" class="text-red-500 mt-2 text-xs pl-4 w-full"/>

            <div class="text-right mt-4">
                <button type="button" @click.prevent="toggleShowForgotPassword()" class="text-xs text-zinc-400 italic border-b border-dashed border-zinc-400 hover:border-zinc-700 hover:text-zinc-700">Forgot Password?</button>
            </div>
            
            <button type="submit" class="btn btn-primary bg-primary py-3 w-full mt-4 rounded-full font-bold shadow-sm hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)] hover:-translate-y-1 duration-300">
                Login
            </button>
            <div class="mt-4 text-center text-xs">
                <span class="text-zinc-400">Do not have an account? </span>                
                <NuxtLink to="/register">Signup</NuxtLink>
            </div>
        </form>
    </div>


    <div class="px-8 py-4" v-else>
        <div class="text-center mb-12">
            <h2 class="text-2xl">Recover Password!</h2>
            <p class="text-neutral-500">Enter your email address and an email with instructions will be sent to you.</p>
        </div>
        <form @submit.prevent="onSubmitForm">
            <div class="flex">
                <div class="border rounded-l-full border-r-0 py-3 px-5 shadow-sm">
                    <i class="text-xs text-zinc-400 fa fa-user"></i>                  
                </div>
                <div class="w-full">
                    <Field v-model="formData.email" id="email" name="email" rules="required|email" type="email" placeholder="Email" 
                    class="py-3 px-5 border rounded-r-full w-full placeholder-zinc-400 shadow-sm focus:outline-none focus:border-blue-300 "
                    :class="[ emailError ? 'border-red-500' : 'border-gray-300']"/>                  
                </div>               
            </div>
            <ErrorMessage name="email" class="text-red-500 mt-2 text-xs pl-4 w-full"/>
            
            <button type="submit" class="btn btn-primary bg-primary py-3 w-full mt-4 rounded-full font-bold shadow-sm hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)] hover:-translate-y-1 duration-300">
                Recover Password
            </button>

            <div class="mt-4 text-center text-xs">
                <span class="text-zinc-400">Remember your password? </span>                
                <button type="submit" @click.prevent="toggleShowForgotPassword()" class="text-zinc-600 hover:text-black"> Login</button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
    import { useForm, ErrorMessage } from 'vee-validate';

    const isForgotpass = ref(false);

    const toggleShowForgotPassword = () => {
        isForgotpass.value = !isForgotpass.value;
    }

    const signIn = defineProps<{
        toggleOpenSignIn: () => void,
    }>();

    const authStore = useAuthStore(); // Sử dụng store

    const router = useRouter();
    const notify = useNotify();
    
    const formData = ref({
        email: '',
        password: '',
    });

    //check error
    const emailError = computed(() => { return !!errors.value.email;});
    const passError = computed(() => { return !!errors.value.password;});

    //login user--------------------------------------------
    const { handleSubmit, errors, resetForm } = useForm();

    const onSubmit = handleSubmit( async () => {
        try {
            await authStore.authenticateUser(formData.value);
            //router.push('/');            
            resetForm();
            signIn.toggleOpenSignIn();

        } catch(e: any) {
            notify({
                message: 'Wrong email or password!',
                type: 'error',
                time: 2000,
            });
        }
    });

    const onSubmitForm = handleSubmit(async () => {
        try {
            await authStore.forgotPassword(formData.value.email);
            notify({
                message: 'A recovery email has been sent. Please check email!',
                type: 'success',
                time: 2000,
            });
        } catch(e: any) {
            notify({
                message: 'Wrong email!',
                type: 'error',
                time: 3000,
            });
        }
    });
</script>

<style scoped>
    .text-lg {
        font-size: 1.125rem !important;
    }
</style>