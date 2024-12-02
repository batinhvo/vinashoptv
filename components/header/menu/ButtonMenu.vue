<template>
    <div>
        <button type="button" class="py-2 pl-2 pr-4 text-black flex flex-col items-center justify-center" @click="toggleMobileMenu">
            <span class="block w-6 h-0.5 bg-black mb-1"></span>
            <span class="block w-6 h-0.5 bg-black mb-1"></span>
            <span class="block w-6 h-0.5 bg-black"></span>
        </button>
    </div>

    <!-- Mobile dropdown menu -->
    <div v-if="isMobileMenuVisible" class="fixed inset-0 bg-white z-50 w-72"
    :class="[isMobileMenuOpen ? 'fadeLeft' : 'fadeRight']">
        <div class="flex justify-between p-4">
            <div class="m-3 pr-8">
                <Logo />
            </div> 
            <button @click="toggleMobileMenu" class="text-xl text-zinc-400" :aria-expanded="isMobileMenuOpen">
                <i class="ec ec-close-remove"></i>
            </button>
        </div>
        <div class="h-full w-full relative inline-block left-0 top-0 px-8" :class="{'translate-x-0': isMobileMenuOpen, '-translate-x-full': !isMobileMenuOpen}">            
            <ul>
                <li v-for="(item, index) in menuItems" :key="index">
                    <div class="flex justify-between items-center py-2">
                        <a :class="[(item.label === 'Sale Off' || item.label === 'SPECIAL') ? 'font-bold' : '']" href=""> {{item.label}} </a>
                        <button @click="toggleColumnMenu(index)">
                            <i v-if="item.hasSubmenu" class="fa text-[8px] text-black" :class="[openSubMenuIndex === index ? 'fa-angle-up' : 'fa-angle-down']"></i>
                        </button>                        
                    </div>
                    <transition name="submenu">
                        <div v-if="openSubMenuIndex === index" class="max-h-[340px] overflow-x-auto">
                            <ul v-if="item.hasSubmenu">
                                <li v-for="(subItem, subIndex) in item.subItems" :key="subIndex" class="py-2 border-l-2 border-primary pl-4">
                                    <a class="font-bold" href=""> {{subItem.label}} </a>
                                    <ul v-if="subItem.hasSubmenu">
                                        <li v-for="(subItem1, subIndex1) in subItem.subItem1" :key="subIndex1" class="pt-4">
                                            <a class="text-gray-500" href=""> {{subItem1.label}} </a>
                                        </li>
                                    </ul>
                                </li>                           
                            </ul>
                        </div>
                    </transition>
                </li>               
            </ul>            
        </div>
    </div>

</template>

<script setup lang="ts">
    import { ref } from 'vue';

    //Menu
    const isMobileMenuOpen = ref(false); // Điều khiển trạng thái đóng/mở
    const isMobileMenuVisible = ref(false); // Điều khiển hiển thị thực tế
    function toggleMobileMenu() {
        if (isMobileMenuOpen.value) {
            // Đang mở, cần đóng
            isMobileMenuOpen.value = false;
            setTimeout(() => {
                isMobileMenuVisible.value = false;
            }, 1000);
        } else {
            // Đang đóng, cần mở
            isMobileMenuVisible.value = true;
            setTimeout(() => {
                isMobileMenuOpen.value = true;
            }, 0);
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
    .fadeLeft {
        animation: fadeLeftEffect .3s ease-out forwards; 
    }

    @keyframes fadeLeftEffect {
        from {
            opacity: 0;
            transform: translateX(-100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .fadeRight {
        animation: fadeRightEffect .3s ease-out forwards; 
    }

    @keyframes fadeRightEffect {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(-100px);
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
    
</style>