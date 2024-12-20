<template>
    <div>
        <div>
            <NuxtImg :src="imgBanner" class="w-full" alt="" />
        </div>
        <div class="container mx-auto">
            <div class="my-0 md:my-10">
                <ul class="flex items-center bg-zinc-100 md:bg-white pl-2 xl:pl-0">
                    <li class="px-3 py-2 hover:bg-zinc-100 rounded hover:border hover:border-gray-200"><a href="/">Home</a></li>
                    <li class="px-2"><i class="ec ec-arrow-right-categproes"></i></li>
                    <li class="px-3 py-2 md:bg-zinc-100 hover:bg-gray-200 rounded md:border md:border-gray-100"><a href="bestseller">Best Seller</a></li>
                </ul>
            </div>           

            <div class="flex flex-wrap">
                <div class="w-full xl:w-1/5 px-4">          
                    <BodyProductMenuNav />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

    const imgBanner = '/images/banner/bg-banner-01.jpg';

</script>

