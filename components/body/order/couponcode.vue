<template>
    <div class="flex pb-5">
        <input
            v-model="couponCode"
            required
            class="w-full focus:outline-none p-2.5 pl-5 focus:border-blue-300 border border-zinc-300 rounded-l-full bg-white"
            type="text" placeholder="Coupon Code" name="coupon">
        <button @click="handlefetchCoupon"
            class="pl-4 text-center text-white bg-gray-600 hover:shadow-xl">
            Apply
        </button>
        <button
            @click="handleCancel"
            class="px-4 text-center text-white bg-gray-600  hover:shadow-xl rounded-r-full">
            Cancel
        </button>
    </div>
</template>

<script setup lang="ts">
    const cartStore = useCartStore();
    const couponCode = ref(""); 
    const emit = defineEmits<{ (e: 'cancel', value: 0): void }>();

    const handlefetchCoupon = () => {
        const code = couponCode.value.trim();
        if (!code) return;
        cartStore.fetchCoupon(code);
    };

    function handleCancel() {
        couponCode.value = "";
        emit('cancel', 0);
    }

</script>