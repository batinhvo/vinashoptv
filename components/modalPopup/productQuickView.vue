<template>
    <div class="max-w-[420px] xl:min-w-[800px]">
        <div class="flex flex-wrap mt-2 bg-zinc-100 border border-gray-200">
            <div class="w-1/2 pr-3 text-center hidden lg:block">
                <div class="border border-gray-200 shadow-inner m-3">
                    <NuxtImg class="w-full" src="/images/products/vinashoptv-product.jpg" alt="Product Image"/>
                </div>
                <div class="hover:-translate-y-1 duration-300 my-6">
                    <NuxtLink class="btn text-black text-xs bg-primary py-1.5 px-4 rounded-md hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)]"
                        to="gg">
                        See Details
                    </NuxtLink>
                </div>
            </div>
            <div class="w-1/2 mt-2 pr-3 hidden lg:block">
                <ModalPopupContentQuickView />
            </div>

            <!-- phone -->
            <div class="w-full text-center lg:hidden">
                <div class="border border-gray-200 shadow-inner m-1">
                    <NuxtImg class="w-full" src="/images/products/vinashoptv-product.jpg" alt="Product Image"/>
                </div>
                <div class="m-2">
                    <ModalPopupContentQuickView />
                </div>
                <div class="hover:-translate-y-1 duration-300 my-8">
                    <NuxtLink class="btn text-black text-xs bg-primary py-1.5 px-4 rounded-md hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)]"
                        to="gg">
                        See Details
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>