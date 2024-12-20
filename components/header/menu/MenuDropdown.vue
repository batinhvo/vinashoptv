<template>
    <div class="relative inline-block">
        <button @click="toggleMenu" class="btn btn-primary bg-primary px-6 py-3 flex items-center font-bold w-[270px] rounded-t-lg">
            <i class="fa fa-list-ul mr-2"></i> All Departments
        </button>

        <div ref="menu"  :class="['list-menu bg-white shadow-lg rounded-b-lg w-[270px] z-50', isMenuOpen ? 'show' : '']">
            <ul class="p-2 relative">
                <li v-for="(item, index) in menuItems" :key="index" class="border-b py-1.5 px-4 hover:bg-neutral-100 cursor-pointer relative group">
                    <NuxtLink to="/" :class="['flex justify-between items-center hover:text-black hover:font-bold', (item.label === 'Sale Off' || item.label === 'SPECIAL') ? 'font-bold' : '']">{{ item.label }}
                        <i v-if="item.hasSubmenu" class="fa fa-angle-right text-neutral-400"></i>
                    </NuxtLink>
                    <!-- Submenu 1 -->                       
                    <ul v-if="item.hasSubmenu" class="submenu bg-white shadow-md absolute rounded-lg left-full mt-0 w-[270px] z-50 top-0 p-2">
                        <li v-for="(subItem, subIndex) in item.subItems" :key="subIndex" class="border-b py-1.5 px-4 hover:bg-neutral-100 cursor-pointer relative">
                            <NuxtLink to="/" class="flex justify-between items-center hover:text-black hover:font-bold">
                                {{ subItem.label }}
                                <i v-if="subItem.hasSubmenu" class="fa fa-angle-right text-neutral-400"></i>
                            </NuxtLink>
                            <!-- Submenu 2 -->                                
                            <ul v-if="subItem.hasSubmenu" class="submenu1 bg-white shadow-md absolute top-0 rounded-lg left-full mt-0 w-[270px] z-50 p-2">
                                <li v-for="(subItem1, subIndex1) in subItem.subItem1" :key="subIndex1" class="border-b py-1.5 px-4 hover:bg-neutral-100 cursor-pointer relative">
                                    <NuxtLink to="/" class="flex justify-between items-center hover:text-black hover:font-bold">
                                        {{ subItem1.label }}
                                        <i v-if="subItem1.hasSubmenu" class="fa fa-angle-right text-neutral-400"></i>
                                    </NuxtLink>
                                </li>
                            </ul>                                
                        </li>
                    </ul>                        
                </li>
            </ul>
        </div>
    </div>
</template>
  
<script setup lang="ts">
 
    const route = useRoute(); //lay thong tin route hien tai
    const isMenuOpen = ref(route.path === "/");

    // Lắng nghe sự thay đổi của route.path 
    // khi chuyển trang mà không reload lại toàn bộ trang thì useRoute sẽ không tự cập nhật lại nên phải dùng watch để lắng nghe sự thay đổi
    watch(() => route.path, (newPath) => {
        isMenuOpen.value = newPath === "/";
    });

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
    
    if (isMenuOpen.value) {
        menu.value?.classList.add("overflow-visible");
    }

    const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value;
        //logic animation
        if (isMenuOpen.value && menu.value) {
            menu.value.classList.add("show");           
            menu.value?.classList.add("overflow-visible");
        } else if (menu.value) {
            menu.value.classList.remove("show");
            
        }
    }
</script>

<style lang="css" scoped>
    button {
        outline: none;
    }

    .list-menu {
        position: absolute;
        overflow: hidden; 
        max-height: 0;
        opacity: 0;
        transition: max-height .6s ease-in-out, opacity 1.2s ease-in-out;
    }

    .list-menu.show {
        max-height: 340px;
        opacity: 1;
        transition: max-height .5s ease-in-out, opacity .5s ease-in-out;
    }

    .list-menu.overflow-visible {
        overflow: visible;
    }

    .list-menu:not(.show) {
        max-height: 0;
        opacity: 0;
    }

    .submenu,
    .submenu1 {
        display: none;
        opacity: 0;
    }

    .group:hover > .submenu,
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
</style>


  