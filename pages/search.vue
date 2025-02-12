<template>
    <div>
        <div>
            <NuxtImg :src="imgBanner" class="w-full" alt="" />
        </div>
        <div class="container mx-auto min-h-[500px]">
            <div class="flex flex-wrap my-0 md:my-10">
                <!-- left -->
                <div class="w-full xl:w-1/5 px-4 hidden xl:block">          
                    <BodyProductMenuNav />
                </div>

                <!-- right -->
                <div class="w-full xl:w-4/5 px-4">          
                    <div class="flex justify-end mb-4">
                        <!-- <h3 class="text-2xl">Best Seller</h3> -->
                        <p>Showing 1-2 of 2 results</p>
                    </div>
                    <BodyHomeSelectSort />
                    <!-- <BodyProductDisplay /> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

    const imgBanner = '/images/banner/bg-banner-01.jpg';

    //----------------------------API------------------------------------//
    
</script>

