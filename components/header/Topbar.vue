<template>
    <div class="border-b border-gray-100 py-2 hidden xl:block">
        <div class="container mx-auto flex justify-between items-center">
            <a href="/" class="text-gray-110 text-font-13 hover:text-black">Welcome to Vinashop</a>
            <div class="flex items-center space-x-4">
                <a href="/" class="text-green-334 text-font-13 hover:text-black flex items-center">
                    <i class="ec ec-map-pointer text-lg mr-1"></i> Store Locator
                </a>
                <span class="text-gray-5">|</span>
                <div class="text-green-334 text-font-13 hover:text-black flex items-center">
                    <i class="ec ec-user text-lg mr-1"></i>
                    <div>
                        <a href="" class="hover:text-black">Register</a>
                        <span class="mx-1 text-gray-50">or</span>
                        <a href="" @click="toggleOpenSignIn" class="hover:text-black">Sign in</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="fixed inset-y-0 right-0 bg-white z-40 w-96 shadow-lg Signin" :class="[ isOpenSignIn ? 'show' : '' ]">
            <div class="flex pt-4 px-7">
                <button class="ml-auto text-xl text-zinc-400" @click="toggleOpenSignIn" :aria-expanded="isOpenSignIn">
                    <i class="ec ec-close-remove"></i>
                </button>
            </div>
            <div class="px-8 py-4">
                <div class="text-center mb-12">
                    <h2 class="text-2xl">Welcome Back!</h2>
                    <p class="text-neutral-500">Login to manage your account.</p>
                </div>
                <form action="" method="post">
                    <div class="flex">
                        <div class="border border-slate-300 rounded-l-full border-r-0 py-3 px-5 shadow-sm">
                            <i class="text-xs text-slate-400 fa fa-user"></i>
                        </div>
                        <div class="w-full">
                            <input class="py-3 px-5 border border-slate-300 rounded-r-full w-full placeholder-slate-400 shadow-sm
                            focus:outline-none focus:border-blue-300 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none" type="email" placeholder="Email">
                        </div>
                    </div>
                    <div class="flex mt-4">
                        <div class="border border-slate-300 rounded-l-full border-r-0 py-3 px-5 shadow-sm">
                            <i class="text-xs text-slate-400 fa fa-lock"></i>
                        </div>
                        <div class="w-full">
                            <input class="py-3 px-5 border border-slate-300 rounded-r-full w-full placeholder-slate-400 shadow-sm
                            focus:outline-none focus:border-blue-300 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none" type="password" placeholder="Password">
                        </div>
                    </div>
                    <button class="btn btn-primary bg-primary py-3 w-full mt-4 rounded-full font-bold shadow-sm hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)] hover:-translate-y-1 duration-300">
                        Login
                    </button>
                    <div class="mt-4 text-center text-xs">
                        <span class="text-slate-400">Do not have an account? </span>
                        <a class="text-black">Signup</a>
                    </div>
                </form>
            </div>
        </div>
    </div>

    
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const isOpenSignIn = ref(false);

    function toggleOpenSignIn() {
        if(isOpenSignIn.value) {
            isOpenSignIn.value = false;
        } else {
            isOpenSignIn.value = true;
        }
    }

</script>

<style scoped>
    .text-lg {
        font-size: 1.125rem !important;
    }

    .Signin {
        overflow: hidden;
        opacity: 0;
        animation: fadeRightEffect .5s ease-out forwards; 
    }

    .Signin.show {
        opacity: 1;
        animation: fadeLeftEffect .5s ease-out forwards; 
    }

    @keyframes fadeLeftEffect {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0px);
        }
    }

    @keyframes fadeRightEffect {
        from {
            opacity: 1;
            transform: translateX(0px);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
</style>