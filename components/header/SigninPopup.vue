<template>
    <div class="px-8 py-4">
        <div class="text-center mb-12">
            <h2 class="text-2xl">Welcome Back!</h2>
            <p class="text-neutral-500">Login to manage your account.</p>
        </div>
        <form @submit.prevent="onSubmit">
            <div class="flex">
                <div class="border border-zinc-300 rounded-l-full border-r-0 py-3 px-5 shadow-sm">
                    <i class="text-xs text-zinc-400 fa fa-user"></i>
                </div>
                <div class="w-full">
                    <input v-model="formData.email" id="email" type="email" class="py-3 px-5 border rounded-r-full w-full placeholder-zinc-400 shadow-sm
                    focus:outline-none focus:border-blue-300 disabled:bg-zinc-50 disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none" placeholder="Email"
                    :class="[errors.email? 'border-red-500' : 'border-zinc-300']">                   
                </div>
            </div>
            <p class="text-red-600 text-xs text-center" v-if="errors.email">{{ errors.email }}</p>

            <div class="flex mt-4">
                <div class="border border-zinc-300 rounded-l-full border-r-0 py-3 px-5 shadow-sm">
                    <i class="text-xs text-zinc-400 fa fa-lock"></i>
                </div>
                <div class="w-full">
                    <input  v-model="formData.password" id="password" type="password" class="py-3 px-5 border rounded-r-full w-full placeholder-zinc-400 shadow-sm
                    focus:outline-none focus:border-blue-300 disabled:bg-zinc-50 disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none" placeholder="Password"
                    :class="[errors.password? 'border-red-500' : 'border-zinc-300']">                   
                </div>               
            </div>
            <p class="text-red-600 text-xs text-center" v-if="errors.password">{{ errors.password }}</p>
            <button type="submit" :disabled="isSubmitting" class="btn btn-primary bg-primary py-3 w-full mt-4 rounded-full font-bold shadow-sm hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)] hover:-translate-y-1 duration-300">
                Login
            </button>
            <div class="mt-4 text-center text-xs">
                <span class="text-zinc-400">Do not have an account? </span>
                <button class="text-black">Signup</button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
    //check form
    const { formData, errors, isSubmitting, onSubmit } = useSignIn();
</script>

<style scoped>
    .text-lg {
        font-size: 1.125rem !important;
    }
</style>