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
                <Logo />
            </div> 
            <button @click="toggleMobileMenu" class="text-xl text-zinc-400" :aria-expanded="isMobileMenuOpen">
                <i class="ec ec-close-remove"></i>
            </button>
        </div>
        <div class="h-full w-full relative inline-block left-0 top-0 px-8">            
            <ul>
                <li v-for="(item, index) in menuItems" :key="index">
                    <div class="flex justify-between items-center py-2">
                        <NuxtLink :class="[(item.label === 'Sale Off' || item.label === 'SPECIAL') ? 'font-bold' : '']" to="bestseller"> {{item.label}} </NuxtLink>
                        <button @click="toggleColumnMenu(index)">
                            <i v-if="item.hasSubmenu" class="fa text-[8px] text-black" :class="[openSubMenuIndex === index ? 'fa-angle-up' : 'fa-angle-down']"></i>
                        </button>                        
                    </div>
                    <transition name="submenu">
                        <div v-if="openSubMenuIndex === index" class="max-h-[340px] overflow-x-auto">
                            <ul v-if="item.hasSubmenu">
                                <li v-for="(subItem, subIndex) in item.subItems" :key="subIndex" class="py-2 border-l-2 border-primary pl-4">
                                    <NuxtLink class="font-bold" to="bestseller"> {{subItem.label}} </NuxtLink>
                                    <ul v-if="subItem.hasSubmenu">
                                        <li v-for="(subItem1, subIndex1) in subItem.subItem1" :key="subIndex1" class="pt-4">
                                            <NuxtLink class="text-gray-500" to="bestseller"> {{subItem1.label}} </NuxtLink>
                                        </li>
                                    </ul>
                                </li>                           
                            </ul>
                        </div>
                    </transition>
                </li>               
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
    </div>
</template>

<script setup lang="ts">
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

    //Sub-Menu
    
    const openSubMenuIndex = ref<number | null>(null); // null nghĩa là không có submenu nào mở
    function toggleColumnMenu(index: number) {
        openSubMenuIndex.value = openSubMenuIndex.value === index ? null : index;
    }

    //Data
    const menuItems = [
        { label: 'Sale Off', hasSubmenu: false },
        { label: 'SPECIAL', hasSubmenu: false },
        { 
            label: 'Ginseng-LINGZHI', 
            hasSubmenu: true,
            subItems: [
                {
                    label: 'Black Ginseng',
                    hasSubmenu: true,
                    subItem1: [
                        {
                            label: 'KBG Candy & Cake',
                            hasSubmenu: false,
                        },
                        {
                            label: 'KBG Capsules',
                            hasSubmenu: false,
                        },
                        {
                            label: 'KBG Extract',
                            hasSubmenu: false,
                        },
                        {
                            label: 'KBG Liquid',
                            hasSubmenu: false,
                        },
                        {
                            label: 'KBG Slice Root',
                            hasSubmenu: false,
                        },
                        {
                            label: 'KBG Whole Root',
                            hasSubmenu: false,
                        },
                    ],
                },
                {
                    label: 'Lingzhi',
                    hasSubmenu: false,
                },
                {
                    label: 'Red Ginseng',
                    hasSubmenu: true,
                    subItem1: [
                        {
                            label: 'KRG Candy',
                            hasSubmenu: false,
                        },
                        {
                            label: 'KRG Extract',
                            hasSubmenu: false,
                        },
                        {
                            label: 'KRG Liquid',
                            hasSubmenu: false,
                        },
                        {
                            label: 'KRG Power',
                            hasSubmenu: false,
                        },
                        {
                            label: 'KRG Slice Root',
                            hasSubmenu: false,
                        },
                        {
                            label: 'KRG Syrub',
                            hasSubmenu: false,
                        },
                        {
                            label: 'KRG Tea',
                            hasSubmenu: false,
                        },
                        {
                            label: 'KRG Whole Root',
                            hasSubmenu: false,
                        },
                    ],
                },
                {
                    label: 'Other Ginseng Types',
                    hasSubmenu: false,
                }
            ]
        },
        { 
            label: 'Supplements', 
            hasSubmenu: true,
            subItems: [
                {
                    label: 'Cordyceps',
                    hasSubmenu: false,                   
                },
                {
                    label: 'Detox - Cleanse',
                    hasSubmenu: false,
                },
                {
                    label: 'Diabetes',
                    hasSubmenu: false,                   
                },
                {
                    label: 'Digestive',
                    hasSubmenu: false,
                },
                {
                    label: 'Essentiali Oils',
                    hasSubmenu: false,                   
                },
                {
                    label: 'Eye Care',
                    hasSubmenu: false,
                },
                {
                    label: 'Fucoidan',
                    hasSubmenu: false,                   
                },
                {
                    label: 'Heart Care',
                    hasSubmenu: false,
                },
                {
                    label: 'Liver Care',
                    hasSubmenu: false,
                },
                {
                    label: 'Men/ Women Enhance',
                    hasSubmenu: false,                   
                },
                {
                    label: 'Pain Relievers',
                    hasSubmenu: false,
                },
                {
                    label: 'Sleep Care',
                    hasSubmenu: false,                   
                },
                {
                    label: 'Other',
                    hasSubmenu: false,
                },
            ]
        },
        { 
            label: 'Food & Drink', 
            hasSubmenu: true,
            subItems: [
                {
                    label: 'Beauty Drink',
                    hasSubmenu: false,                    
                },
                {
                    label: 'Food',
                    hasSubmenu: false,
                },
                {
                    label: 'Nutritional Drink',
                    hasSubmenu: false,                    
                },
                {
                    label: 'Nutritional Powder',
                    hasSubmenu: false,
                },
                {
                    label: 'Suremeal',
                    hasSubmenu: false,
                }
            ]
        },
        { 
            label: 'Skin Care', 
            hasSubmenu: true,
            subItems: [
                {
                    label: 'Body Care',
                    hasSubmenu: false,                   
                },
                {
                    label: 'Cleanser',
                    hasSubmenu: false,
                },
                {
                    label: 'Cream',
                    hasSubmenu: false,                   
                },
                {
                    label: 'Eye Cream',
                    hasSubmenu: false,
                },
                {
                    label: 'Hand Care',
                    hasSubmenu: false,                   
                },
                {
                    label: 'Makeup',
                    hasSubmenu: false,
                },
                {
                    label: 'Mask',
                    hasSubmenu: false,                   
                },
                {
                    label: 'Scrub',
                    hasSubmenu: false,
                },
                {
                    label: 'Serum',
                    hasSubmenu: false,
                },
                {
                    label: 'Sunscreen',
                    hasSubmenu: false,                   
                },
                {
                    label: 'Toner',
                    hasSubmenu: false,
                },
                {
                    label: 'Treatment',
                    hasSubmenu: false,                   
                },
                {
                    label: 'Sets',
                    hasSubmenu: false,
                },
            ]
        },
        { 
            label: 'Hair Care', 
            hasSubmenu: true,
            subItems: [
                {
                    label: 'Hair Color',
                    hasSubmenu: false,                   
                },
                {
                    label: 'Rehabilitation',
                    hasSubmenu: false,
                },
                {
                    label: 'Shampoo & Conditioner',
                    hasSubmenu: false,                   
                }
            ]
        },
        { 
            label: 'Masks & Sanitizer', 
            hasSubmenu: true,
            subItems: [
                {
                    label: 'Masks',
                    hasSubmenu: false,
                }
            ]
        },
        { 
            label: 'Electronics +', 
            hasSubmenu: true,
            subItems: [
                {
                    label: 'Electronics',
                    hasSubmenu: false,
                },
                {
                    label: 'Others',
                    hasSubmenu: false,
                }
            ]
        }     
    ];
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


    .submenu-content {
        transition: max-height 0.5s ease;
        max-height: 0;
        overflow: hidden;
    }

    .submenu-enter-active, .submenu-leave-active {
        transition: max-height 0.5s ease;
    }

    .submenu-enter-to, .submenu-leave-from {
        max-height: 340px;
    }

    .submenu-enter-from, .submenu-leave-to {
        max-height: 0;
    }
    

    /* footer */
    .wave-bottom-with-dots-2{fill:#DE4437;}
    .wave-bottom-with-dots-3{fill:#00C9A7;}
    .wave-bottom-with-dots-4{fill:#FFC107;}
</style>