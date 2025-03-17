<template>
    <div>
        <Header />
        <slot />
        <Footer />

        <ModalPages v-if="showSubcribe" @close="showSubcribe = false">
            <template #body>
                <ModalPopupSubcribeDiscount />
            </template>
            <template #actions>
                <button class="w-full m-4 mt-0 px-5 py-3 text-black text-lg bg-[#26d000] rounded-full shadow-sm hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)] hover:-translate-y-1 duration-300">Subcribe</button>
            </template>
        </ModalPages>
    </div>
</template>

<script setup lang="ts">
    const authStore = useAuthStore();
    const orderStore = useOrderStore();

    const showSubcribe = ref(false);

    const setShowSubcribe = (value: boolean) => {
        showSubcribe.value = value;
    }

    provide("setShowSubcribe", setShowSubcribe);

    onMounted(async () => {
        if(authStore.authenticated) {
            const lastVisit  = localStorage.getItem('lastVisitDate');
            const today = new Date().toDateString();

            await orderStore.getDataOrderHistory();

            if (lastVisit !== today) {
                showSubcribe.value = true;
                localStorage.setItem('lastVisitDate', today);
            } else {
                showSubcribe.value = false;
            }
        } else {
            showSubcribe.value = false;
        }
    });
</script>