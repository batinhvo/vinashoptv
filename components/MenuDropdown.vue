<template>
    <div class="relative">
        <button @click="toggleMenu" class="btn btn-primary bg-primary px-6 py-3 flex items-center font-bold w-[270px] rounded-t-lg">
            <i class="fa fa-list-ul mr-2"></i> All Departments
        </button>
        <transition name="fade">
            <div v-show="isMenuOpen" ref="menu" class="list-menu absolute bg-white shadow-lg rounded-b-lg w-[270px] z-50">
                <ul class="p-2">
                    <li v-for="(item, index) in menuItems" :key="index" class="border-b py-1.5 px-4 hover:bg-neutral-100 cursor-pointer relative group">
                        <a href="#" :class="['flex justify-between items-center hover:text-black hover:font-bold', (item.label === 'Sale Off' || item.label === 'SPECIAL') ? 'font-bold' : '']">{{ item.label }}
                            <i v-if="item.hasSubmenu" class="fa fa-angle-right text-neutral-400"></i>
                        </a>
                        <!-- Submenu 1 -->
                        <transition name="fade">
                        <ul v-if="item.hasSubmenu" class="submenu bg-white shadow-md absolute rounded-lg left-full mt-0 w-[270px] z-50 top-0 p-2">
                            <li v-for="(subItem, subIndex) in item.subItems" :key="subIndex" class="border-b py-1.5 px-4 hover:bg-neutral-100 cursor-pointer relative">
                                <a href="#" class="flex justify-between items-center hover:text-black hover:font-bold">
                                    {{ subItem.label }}
                                    <i v-if="subItem.hasSubmenu" class="fa fa-angle-right text-neutral-400"></i>
                                </a>
                                <!-- Submenu 2 -->
                                <transition name="fade">
                                <ul v-if="subItem.hasSubmenu" class="submenu1 bg-white shadow-md absolute top-0 rounded-lg left-full mt-0 w-[270px] z-50 p-2">
                                    <li v-for="(subItem1, subIndex1) in subItem.subItem1" :key="subIndex1" class="border-b py-1.5 px-4 hover:bg-neutral-100 cursor-pointer relative">
                                        <a href="#" class="flex justify-between items-center hover:text-black hover:font-bold">
                                            {{ subItem1.label }}
                                            <i v-if="subItem1.hasSubmenu" class="fa fa-angle-right text-neutral-400"></i>
                                        </a>
                                    </li>
                                </ul>
                                </transition>
                            </li>
                        </ul>
                        </transition>
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>
  
<script setup lang="ts">
 
    const isMenuOpen = ref(false);
    const menu = ref<HTMLElement | null>(null);
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
    
    const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value;
    }
</script>

<style lang="css" scoped>
.submenu,
.submenu1 {
  display: none;
  opacity: 0;
}

.group:hover > .submenu {
  display: block;
  opacity: 1;
}

.submenu > li:hover > .submenu1 {
  display: block;
  opacity: 1;
}

.submenu > li:hover .submenu1:hover {
  display: block;
}

.submenu li:hover:not(:has(.submenu1)) .submenu1 {
  display: none;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
</style>


  