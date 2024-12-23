<template>
    <div class="bg-black/50 w-full h-full fixed inset-0 z-50 flex justify-center items-center">       
        <div class="flex flex-wrap max-w-[800px] bg-neutral-100 p-3 pb-6 rounded-lg border border-white shadow-2xl">
            <button class="w-full flex justify-end text-base text-gray-400 hover:text-gray-600">
                <i class="fa fa-times" aria-hidden="true"></i>
            </button>
            <div class="w-1/2 pr-3 text-center">
                <div class="border border-gray-200">
                    <NuxtImg class="w-full" src="/images/products/vinashoptv-product.jpg" alt="Product Image"/>
                </div>
                <button class="btn text-black bg-primary py-1.5 px-4 rounded-md hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)] hover:-translate-y-1 duration-300 mt-6">
                    See Details
                </button>
            </div>
            <div class="w-1/2 px-3 ">
                <div>
                    <NuxtLink class="text-xs">Hair Color</NuxtLink>
                    <div class="text-xl mt-3">Assanta Hair Color # 4 Minute 60g (Light Chestnut) 2 tubes x 60g</div>
                </div>
                <div class="flex justify-between items-end mt-5 pb-5 border-b border-gray-300">
                    <div>
                        <div class="line-through">$139.00</div>
                        <div class="text-2xl text-red-500">$99.00</div>
                    </div>
                    <div class="text-xs">Sold: 10000</div>
                </div>
                <div class="mt-5 line-clamp-4 text-justify">
                    Enriched with keratin, ceramide, natural ingredients (Green Tea Extract, Jojoba, Olive Oil, Aloe Vera Gel, Acorus Calamus Root Extract) and with no ammonia, it nourishes hair fibers deep within and keeps hair healthy. -Olive Oil, Aloe Vera Gel, Acorus Calamus Root Extract) and with no ammonia, it nourishes hair fibers deep within and keeps hair healthy. 
                </div>
            </div>
        </div>
    </div>
</template>




