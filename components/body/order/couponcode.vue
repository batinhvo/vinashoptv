<template>
    <div class="flex pb-5">
        <input
            :value="modelValue"
            @input="onInput"
            name="coupon"
            class="w-full focus:outline-none p-2.5 pl-5 focus:border-blue-300 border border-zinc-300 rounded-l-full bg-white"
            type="text"
            placeholder="Coupon Code">

        <button 
            @click="handleFetchCoupon"
            type="button"
            class="pl-4 text-center text-white bg-gray-600 hover:shadow-xl">
            Apply
        </button>

        <button
            @click="handleCancel"
            type="button"
            class="px-4 text-center text-white bg-gray-600  hover:shadow-xl rounded-r-full">
            Cancel
        </button>
    </div>
</template>

<script setup lang="ts">
    const cartStore = useCartStore();

    const props = defineProps<{
        modelValue: string
    }>();
    const emit = defineEmits<{
        (e: 'update:modelValue', value: string): void
    }>();
    const onInput = (e: Event) => {
        emit('update:modelValue', (e.target as HTMLInputElement).value);
    };

    // ---- Xử lý apply coupon ----
    const handleFetchCoupon = async (e: Event) => {
        e.preventDefault();
        const code = props.modelValue.trim();
        if (!code) return;
        await cartStore.fetchCoupon(code);
    };

    // ---- Xử lý cancel coupon ----
    function handleCancel(e: Event) {
        e.preventDefault();
        emit('update:modelValue', '');       // reset về rỗng cho cha
        cartStore.cancelCodeCoupon();
    }

</script>