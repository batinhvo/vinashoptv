<template>
    <div>
        <button type="button" class="py-2 pl-2 pr-4 text-black flex flex-col items-center justify-center" @click="toggleMobileMenu">
            <span class="block w-6 h-0.5 bg-black mb-1"></span>
            <span class="block w-6 h-0.5 bg-black mb-1"></span>
            <span class="block w-6 h-0.5 bg-black"></span>
        </button>
    </div>

    <!-- Mobile dropdown menu -->
    <div v-if="isMobileMenuVisible" class="fixed inset-0 bg-white z-50 w-72 menu" :class="[isMobileMenuOpen ? 'show' : '']">
        <div class="flex justify-between p-4">
            <div class="m-3 pr-8">
                <vinaLogo />
            </div> 
            <button @click="toggleMobileMenu" class="text-xl text-zinc-400" :aria-expanded="isMobileMenuOpen">
                <i class="ec ec-close-remove"></i>
            </button>
        </div>
        <div class="h-full w-full relative inline-block left-0 top-0 px-8">            
            <ul>
                <li>
                    <div class="flex justify-between items-center py-2">
                        <NuxtLink to="/saleoff" class="font-bold" @click.prevent="toggleMobileMenu">Sale Off</NuxtLink>                                              
                    </div>                   
                </li>   
                <MenuContentMenuPhone 
                v-for="(cate, index) in dataCategories" 
                :key="index" 
                :cate="cate" 
                :openCategory="openCategory"
                @update:openCategory="openCategory = $event"
                :toggleMobileMenu="toggleMobileMenu"
                />      
                      
            </ul>            
        </div>

        <div class="absolute right-0 bottom-0 left-0 z-10">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 300 126.5" style="margin-bottom: -5px; enable-background:new 0 0 300 126.5;" xml:space="preserve" class="injected-svg js-svg-injector" data-parent="#SVGwaveWithDots">
            <path class="wave-bottom-with-dots-0 fill-primary" opacity=".6" d="M0,58.9c0-0.9,5.1-2,5.8-2.2c6-0.8,11.8,2.2,17.2,4.6c4.5,2.1,8.6,5.3,13.3,7.1C48.2,73.3,61,73.8,73,69  c43-16.9,40-7.9,84-2.2c44,5.7,83-31.5,143-10.1v69.8H0C0,126.5,0,59,0,58.9z"></path>
            <path class="wave-bottom-with-dots-1 fill-primary" d="M300,68.5v58H0v-58c0,0,43-16.7,82,5.6c12.4,7.1,26.5,9.6,40.2,5.9c7.5-2.1,14.5-6.1,20.9-11  c6.2-4.7,12-10.4,18.8-13.8c7.3-3.8,15.6-5.2,23.6-5.2c16.1,0.1,30.7,8.2,45,16.1c13.4,7.4,28.1,12.2,43.3,11.2  C282.5,76.7,292.7,74.4,300,68.5z"></path>
            <g>
                <circle class="wave-bottom-with-dots-2 fill-danger" cx="259.5" cy="17" r="13"></circle>
                <circle class="wave-bottom-with-dots-1 fill-primary" cx="290" cy="35.5" r="8.5"></circle>
                <circle class="wave-bottom-with-dots-3 fill-success" cx="288" cy="5.5" r="5.5"></circle>
                <circle class="wave-bottom-with-dots-4 fill-warning" cx="232.5" cy="34" r="2"></circle>
            </g>
            </svg>
        </div>

        <div class="z-20 absolute bottom-2 flex flex-wrap w-full text-center px-12">
            <NuxtLink to="/article/about-us" class="text-xs w-1/3" @click.prevent="toggleMobileMenu">About Us</NuxtLink>
            <NuxtLink to="/contact" class="text-xs w-1/3" @click.prevent="toggleMobileMenu">Contact</NuxtLink>
            <NuxtLink to="/" class="text-xs w-1/3" @click.prevent="toggleMobileMenu"><i class="fa fa-info-circle" aria-hidden="true"></i></NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { type Category } from "types/categoryTypes";

    //Menu
    const isMobileMenuOpen = ref(false); // Điều khiển trạng thái đóng/mở
    const isMobileMenuVisible = ref(false); // Điều khiển hiển thị thực tế
    function toggleMobileMenu() {
        if (isMobileMenuOpen.value) {
            // Đang mở, cần đóng
            isMobileMenuOpen.value = false;
            setTimeout(() => {
                isMobileMenuVisible.value = false;
            }, 500);
        } else {
            // Đang đóng, cần mở
            isMobileMenuVisible.value = true;
            isMobileMenuOpen.value = true;
        }
    }

    //-----------------------------------API-------------------------------------//

    const dataCategories = ref<Category[]>([]);
    const openCategory = ref<string | null>(null);

    const cateStores = useCateStore();
    dataCategories.value = cateStores.categories || [];
    
</script>

<style scoped>
    .menu {
        overflow: hidden;
        opacity: 0;
        animation: fadeLeftEffect .5s ease-out forwards; 
    }

    .menu.show {
        opacity: 1;
        animation: fadeRightEffect .5s ease-out forwards; 
    }

    @keyframes fadeLeftEffect {
        from {
            opacity: 1;
            transform: translateX(0px);
        }
        to {
            opacity: 0;
            transform: translateX(-100%);
        }
    }

    @keyframes fadeRightEffect {
        from {
            opacity: 0;
            transform: translateX(-100%);
        }
        to {
            opacity: 1;
            transform: translateX(0px);
        }
    }

    /* footer */
    .wave-bottom-with-dots-2{fill:#DE4437;}
    .wave-bottom-with-dots-3{fill:#00C9A7;}
    .wave-bottom-with-dots-4{fill:#FFC107;}
</style>
