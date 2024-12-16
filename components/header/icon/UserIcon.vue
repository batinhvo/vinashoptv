<template>
    <div class="ml-auto">
        <button type="button" @click="toggleOpenSignIn" class="py-2 px-2 text-black flex items-center justify-center text-font-22">
            <i class="ec ec-user"></i>
        </button>
    </div>

    <div v-if="isSignInVisible" class="fixed inset-y-0 right-0 bg-white z-40 w-96 shadow-lg Signin" :class="[ isOpenSignIn ? 'show' : '' ]">
        <div class="flex pt-4 px-7">
            <button class="ml-auto text-xl text-zinc-400" @click="toggleOpenSignIn" :aria-expanded="isOpenSignIn">
                <i class="ec ec-close-remove"></i>
            </button>
        </div>
        <HeaderSigninPopup />
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

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