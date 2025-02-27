<template>
    <div class="ml-auto">
        <button v-if="authStore.authenticated" type="button" @click="toggleOpenChoice" class="py-2 px-2 text-black flex items-center justify-center text-font-22" :class=" isOpenChoice ? 'bg-white border border-gray-300 rounded-md' : ''">
            <i class="ec ec-user"></i> 
        </button>

        <button v-else type="button" @click="toggleOpenSignIn" class="py-2 px-2 text-black flex items-center justify-center text-font-22">
            <i class="ec ec-user"></i> 
        </button>
    </div>

    <div class="w-40 absolute z-50 py-3 right-12 top-10" v-if="isOpenChoice">
        <div class="bg-white border border-gray-200 shadow-xl py-3">                               
            <NuxtLink to="/user" @click.prevent="toggleOpenChoice" class="block py-1.5 px-5 hover:bg-zinc-200">Profile</NuxtLink>                                    
            <button @click.prevent="openEditProfile(); isOpenChoice = false" class="block py-1 w-full text-left px-5 hover:bg-gray-200">Edit Profile</button>
            <button @click.prevent="openChangePass(); isOpenChoice = false" class="block py-1 w-full text-left px-5 hover:bg-gray-200">Change Password</button>
            <NuxtLink to="/user/orderhistory" @click.prevent="toggleOpenChoice" class="block py-1.5 px-5 hover:bg-zinc-200">Your Orders</NuxtLink>
            <button @click="logOutUser(); isOpenChoice = false" class="block py-1 w-full text-left px-5 hover:bg-gray-200">Log out</button>
        </div>
    </div>

    <div v-if="isSignInVisible" class="fixed inset-y-0 right-0 bg-white z-40 w-96 shadow-lg Signin" :class="[ isOpenSignIn ? 'show' : '' ]">
        <div class="flex pt-4 px-7">
            <button class="ml-auto text-xl text-zinc-400" @click="toggleOpenSignIn" :aria-expanded="isOpenSignIn">
                <i class="ec ec-close-remove"></i>
            </button>
        </div>
        <HeaderSignInPopup :toggleOpenSignIn="toggleOpenSignIn" />
    </div>

    <!-- edit profile -->
    <ModalPages v-if="showModalProfile" title="Edit Profile" @close="showModalProfile = false">
        <template #body>
            <ModalPopupEditProfile :triggerSubmit="triggerSubmitProfile" :userData="authStore.userInfo"/>
        </template>
        <template #actions>
            <button @click="handleUpdateProfile" class="my-3 mr-5 bg-[#26d000] text-black px-5 py-2 rounded-full shadow-sm hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)] hover:-translate-y-1 duration-300">Update Profile</button>
        </template>
    </ModalPages>


    <!-- edit password -->
    <ModalPages v-if="showchangePass" title="Change Password" @close="showchangePass = false">
        <template #body>
            <ModalPopupChangePass/>
        </template>
        <template #actions>
            <button class="my-3 mr-5 bg-[#26d000] text-black px-5 py-2 rounded-full shadow-sm hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)] hover:-translate-y-1 duration-300">Apply</button>
        </template>
    </ModalPages>
</template>

<script setup lang="ts">

    const triggerSubmitProfile = ref(false);
    const handleUpdateProfile = () => {
        triggerSubmitProfile.value = true
        // Reset sau 100ms để lần sau click còn hoạt động
        setTimeout(() => {
            triggerSubmitProfile.value = false
        }, 100)
    };

    //signed
    const isOpenChoice = ref(false);
    function toggleOpenChoice() {
        isOpenChoice.value =! isOpenChoice.value;
    }

    //show modal
    const showchangePass = ref(false);
    const openChangePass = () => { showchangePass.value = true };

    const showModalProfile = ref(false);
    const openEditProfile = () => { showModalProfile.value = true };

    //show login
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

    //------------------------------------------------------------------------------------//

    const router = useRouter();
    const authStore = useAuthStore();

    const logOutUser = () => {
        authStore.logOut();
        router.push('/');
    }

    onMounted( async () => {
        authStore.restoreUser();
        await authStore.getInfoUser();
    });
</script>

<style lang="css" scoped>
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