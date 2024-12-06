<template>
    <div class="container mx-auto mb-8">
        <a href="/" class="block" @click.prevent="showAlert">
            <div class="bg-[url('/images/bg-discount.jpg')] bg-cover bg-top-center mx-4">
                <div class="px-12 py-6 lg:py-0">
                    <div class="flex flex-wrap items-center lg:p-14">
                        <div class="w-full lg:w-1/2 mb-2">
                            <h1 class="text-2xl font-light leading-9">
                                <span>Shop and</span>
                                <strong class="font-bold text-[#167000]"> BIG DISCOUNT</strong>
                                <span> on Water Filters</span>
                            </h1>
                        </div>
                        <div class="w-full lg:w-1/2 flex items-center justify-center">
                            <div class="bg-primary py-2 px-10 rounded-md">
                                <em class="font-light leading-loose">STARTING AT</em>
                                <div class="font-bold leading-none text-3xl">
                                    <sup>$</sup>
                                    <span>1095</span>
                                    <sup>00</sup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </a>           
    </div>
</template>

<script setup lang="ts">

    const Alert = useNotify();


    const showAlert = () => {
        Alert({
            message: "đây là thông báo từ VinaShop",
            type: "info",
            time: 0,
        });
    }
</script>