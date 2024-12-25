<template>
    <div>
        <div>
            <NuxtImg :src="imgBanner" class="w-full" alt="" />
        </div>
        <div class="container mx-auto">
            <!-- header -->
            <div class="my-0 md:my-10 overflow-x-auto whitespace-nowrap max-w-[450px] md:max-w-full">
                <ul class="flex items-center bg-zinc-100 md:bg-white py-2 xl:py-0 pl-2 xl:pl-0">
                    <li class="px-3 py-2 hover:bg-zinc-100 rounded hover:border hover:border-gray-200"><a href="/">Home</a></li>
                    <li class="px-2"><i class="ec ec-arrow-right-categproes"></i></li>
                    <li class="px-3 py-2 md:bg-zinc-100 hover:bg-gray-200 rounded md:border md:border-gray-100"><a href="bestseller">Hair Color</a></li>
                    <li class="px-2"><i class="ec ec-arrow-right-categproes"></i></li>
                    <li class="px-3 py-2 rounded"><a href="bestseller">Assanta Hair Color # 4 Minute 60g (Light Chestnut) 2 tubes x 60g</a></li>
                </ul>
            </div>         
            
            <!-- main -->
            <div class="flex flex-wrap mb-6 mt-5 md:mt-0">
                <div class="w-full md:w-1/2 lg:w-1/3 xl:w-5/12 px-4">
                    <BodyProductSlideImage />              
                </div>

                <div class="w-full md:w-1/2 lg:w-1/3 xl:w-4/12 px-4 mt-8 md:mt-0">
                    <div class="text-xs mb-2">Hair Color</div>
                    <div class="text-2xl">Assanta Hair Color # 4 Minute 60g (Light Chestnut) 2 tubes x 60g</div>
                    <div class="text-right mb-2 pr-3">Sold: 1000</div>
                    <p class="text-justify">
                        • Enriched with keratin, ceramide, natural ingredients (Green Tea Extract, Jojoba, Olive Oil, Aloe Vera Gel, Acorus Calamus Root Extract) and with no ammonia, it nourishes hair fibers deep within and keeps hair healthy.<br>
                        • The hair dye is natural, non-toxic, with a mild formula that does not irritate the scalp.
                    </p>
                </div>

                <div class="w-full md:w-full lg:w-1/3 xl:w-3/12 px-4 mt-8 xl:mt-0">
                    <BodyProductSelectionProductType />
                </div>
            </div>
        </div>
        <BodyProductDesc />
    </div>
</template>

<script setup lang="ts">
    const imgBanner = '/images/banner/bg-banner-01.jpg';
</script>



