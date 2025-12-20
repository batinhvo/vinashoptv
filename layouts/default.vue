<template>
    <div>
        <HeaderAppHeader />
        <slot />
        <FooterAppFooter />

        <ModalPages v-if="showSubcribe" @close="showSubcribe = false">
            <template #body>
                <ModalPopupSubcribeDiscount :triggerSubmitSubscribeEmail="triggerSubmitSubscribeEmail" :email="authStore.userInfo?.email" />
            </template>
            <template #actions>
                <button @click.prevent="handleSubscribeEmail(); onShowSubcribe()"
                    class="w-full m-4 mt-0 px-5 py-3 text-black text-lg bg-[#26d000] rounded-full shadow-sm hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)] hover:-translate-y-1 duration-300">
                    Subcribe
                </button>
            </template>
        </ModalPages>
    </div>
</template>

<script setup lang="ts">

    const authStore = useAuthStore();
    const cartStore = useCartStore();

    const showSubcribe = ref(false);
    const triggerSubmitSubscribeEmail = ref(false);

    const setShowSubcribe = (value: boolean) => {
        showSubcribe.value = value;
    }

    const handleSubscribeEmail = () => {
        triggerSubmitSubscribeEmail.value = true
        setTimeout(() => {
            triggerSubmitSubscribeEmail.value = false
        }, 100)
    };

    const onShowSubcribe = () => { 
        setTimeout(() => {
            setShowSubcribe?.(false); 
        }, 2000)
    };

    provide("setShowSubcribe", setShowSubcribe);

    const isLoading = ref(false);

    watch(
        () => authStore.authenticated,
        async (isAuth) => {
            if (!isAuth) return;
            if (isLoading.value) return;

            isLoading.value = true;

            try {
                cartStore.loadCartFromStorage();

                await Promise.all([              
                    //authStore.getInfoUser(),
                    authStore.checkSubscribeEmail(),
                    cartStore.fetchDataCart(),
                ]);

                // 🔥 CHECK SAU KHI API XONG
                if (authStore.infoSubscribe?.userId) {
                    showSubcribe.value = false;
                    return;
                }

                const today = new Date().toDateString();
                const lastVisit = localStorage.getItem('lastVisitDate');
                
                if (lastVisit !== today && authStore.infoSubscribeLoaded == false) {                 
                    showSubcribe.value = true;
                    localStorage.setItem('lastVisitDate', today);
                } else {
                    showSubcribe.value = false;
                }  

            } finally {
                isLoading.value = false;
            }
        },
        { immediate: true }
    );

</script>