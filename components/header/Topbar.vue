<template>
    <div class="border-b border-gray-100 py-2 hidden xl:block">
        <div class="container flex justify-between items-center">
            <NuxtLink to="/" class="text-gray-110 text-font-13 hover:text-black">Welcome to Vinashop</NuxtLink>
            <div class="flex items-center space-x-4">
                <NuxtLink to="/contact" class="text-green-334 text-font-13 hover:text-black flex items-center">
                    <i class="ec ec-map-pointer text-lg mr-1"></i> Store Locator
                </NuxtLink>
                <span class="text-gray-5">|</span>
                <div class="text-green-334 text-font-13 hover:text-black flex items-center">
                    <i class="ec ec-user text-lg mr-1"></i>
                    <div v-if="user" class="relative group cursor-pointer">                       
                        {{ user.email }}
                        <div class="w-40 absolute z-50 py-3 hidden group-hover:block">
                            <div class="bg-white border border-gray-200 shadow-xl py-3">                               
                                <NuxtLink to="/user" class="block py-1.5 px-5 hover:bg-zinc-200">Profile</NuxtLink>                                    
                                <button @click.prevent="openEditProfile" class="block py-1 w-full text-left px-5 hover:bg-gray-200">Edit Profile</button>
                                <button @click.prevent="openChangePass" class="block py-1 w-full text-left px-5 hover:bg-gray-200">Change Password</button>
                                <NuxtLink to="/user/orderhistory" class="block py-1.5 px-5 hover:bg-zinc-200">Your Orders</NuxtLink>
                                <button @click="logout" class="block py-1 w-full text-left px-5 hover:bg-gray-200">Log out</button>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <NuxtLink to="/register" class="hover:text-black">Register</NuxtLink>
                        <span class="mx-1 text-gray-50">or</span>
                        <button @click="toggleOpenSignIn" class="hover:text-black">Sign in</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- edit profile -->
        <ModalPages v-if="showModalProfile" title="Edit Profile" @close="showModalProfile = false">
            <template #body>
                <ModalPopupEditProfile ref="modalPopupEditProfileRef"/>
            </template>
            <template #actions>
                <button @click.prevent="modalPopupEditProfileRef?.submitForm()" class="my-3 mr-5 bg-[#26d000] text-black px-5 py-2 rounded-full shadow-sm hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)] hover:-translate-y-1 duration-300">Update Profile</button>
            </template>
        </ModalPages>


        <!-- edit password -->
        <ModalPages v-if="showchangePass" title="Change Password" @close="showchangePass = false">
            <template #body>
                <ModalPopupChangePass ref="modalPopupChangePassRef"/>
            </template>
            <template #actions>
                <button @click.prevent="modalPopupChangePassRef?.submitForm()" class="my-3 mr-5 bg-[#26d000] text-black px-5 py-2 rounded-full shadow-sm hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)] hover:-translate-y-1 duration-300">Apply</button>
            </template>
        </ModalPages>

        <div v-if="isSignInVisible" class="fixed inset-y-0 right-0 bg-white z-40 w-96 shadow-lg Signin" :class="[ isOpenSignIn ? 'show' : '' ]">
            <div class="flex pt-4 px-7">
                <button class="ml-auto text-xl text-zinc-400" @click.prevent="toggleOpenSignIn" :aria-expanded="isOpenSignIn">
                    <i class="ec ec-close-remove"></i>
                </button>
            </div>
            <HeaderSigninPopup />
        </div>
    </div>

    
</template>

<script setup lang="ts">
import type { ModalPopupChangePass, ModalPopupEditProfile } from '.nuxt/components';

    const modalPopupChangePassRef = ref<InstanceType<typeof ModalPopupChangePass> | null>(null);
    const modalPopupEditProfileRef = ref<InstanceType<typeof ModalPopupEditProfile> | null>(null);

    const isOpenSignIn = ref(false);
    const isSignInVisible = ref(false);

    function toggleOpenSignIn() {
        if(isOpenSignIn.value) {
            isOpenSignIn.value = false;
            setTimeout(() => {
                isSignInVisible.value = false;
            }, 1000);
        } else {
            isOpenSignIn.value = true;
            isSignInVisible.value = true;
        }
    }

    //signed
    const {user, logout} = useAuth();    

    //show modal
    const showchangePass = ref(false);
    const openChangePass = () => {
        showchangePass.value = true;
    };

    const showModalProfile = ref(false);
    const openEditProfile = () => {
        showModalProfile.value = true;
    };
</script>

<style lang="css" scoped>
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