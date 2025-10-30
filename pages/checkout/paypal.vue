<template>
    <div class="container max-w-[1400px]">
        <div class="mt-0 md:mt-10">
            <ul class="flex items-center bg-zinc-100 md:bg-white pl-2 xl:pl-0">
                <li class="px-3 py-2 hover:bg-zinc-100 rounded hover:border hover:border-gray-200">
                    <a href="/">Home</a>
                </li>
                <li class="px-2">
                    <i class="ec ec-arrow-right-categproes"></i>
                </li>
                <li class="px-3 py-2 md:bg-zinc-100 hover:bg-gray-200 rounded md:border md:border-gray-100">
                    <a href="/checkout">Checkout using paypal</a>
                </li>
            </ul>
        </div>

        <div class="container my-10">
            <div class="bg-[#f5f5f5] px-8 py-6 rounded-lg border border-gray-300 text-center">
                <i class="text-4xl text-primary fa fa-check-square py-10"></i>

                <h1 class="text-center text-4xl pb-5 font-bold">You have paid successfully</h1>
                <h3 class="text-center text-xl font-normal pb-10">Your invoice currently being processed!</h3>
                <div class="pb-10">
                    <NuxtLink :to="`/user/orderhistory`">
                        <button class="in-top-3 btn btn-primary bg-primary py-2 px-5 lg:px-12 rounded-lg text-base text-gray-22 font-normal hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)]">
                            View history orders
                        </button>
                    </NuxtLink>   
                </div>                 

            </div>
            
        </div>
    </div>
</template>

<script setup lang="ts">
    

</script>

<style lang="css" scoped>
.title.border-b::after {
    content: ' ';
    height: 2px;
    width: 114px;
    display: block;
    background-color: #20d600;
    position: relative;
    bottom: -1px;
    left: 0;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="number"] {
    -moz-appearance: textfield;
    /* Ẩn trên Firefox */
    appearance: none;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>