<template>
    <div class="w-full bg-white shadow-lg border border-gray-100 rounded-lg pb-3">
        <div class="px-8 py-4 border-b border-gray-100 text-base">Browse Categories</div>
        <ul class="px-2">           
            <li v-for="(item, index) in menuItems" :key="index">
                <div class="border-b border-gray-100 px-2">
                    <div class="cursor-pointer flex justify-between items-center hover:bg-neutral-100 px-4 py-2" @click="toggleColumnMenu(index)">
                        <NuxtLink to="bestseller" class="hover:text-black" :class="[openSubMenuIndex === index ? 'font-bold' : '']"> {{item.label}} </NuxtLink>
                        <button>
                            <i v-if="item.hasSubmenu" class="fa text-xs" :class="[openSubMenuIndex === index ? 'fa-angle-up' : 'fa-angle-down']"></i>
                        </button>                           
                    </div>  
                    <!-- menu 1 -->
                    <div v-if="item.hasSubmenu" :class="[openSubMenuIndex === index ? 'block' : 'hidden']"> 
                        <ul class="px-2">
                            <li v-for="(subItem, subIndex) in item.subItems" :key="subIndex">
                                <div class="cursor-pointer flex justify-between items-center py-2 px-3 hover:bg-neutral-100 border-t border-gray-100" @click="toggleColumnMenu1(index)">
                                    <NuxtLink to="bestseller" class="hover:text-black"> {{subItem.label}} </NuxtLink>
                                    <button>
                                        <i v-if="subItem.hasSubmenu" class="fa text-xs" :class="[openSubMenuIndex1 === index ? 'fa-angle-up font-bold' : 'fa-angle-down']"></i>
                                    </button>                           
                                </div>  
                                <!-- menu 2 -->
                                <div v-if="subItem.hasSubmenu" :class="[openSubMenuIndex1 === subIndex ? 'block' : 'hidden']">
                                    <ul class="px-2">
                                        <li v-for="(subItem1, subIndex1) in subItem.subItem1" :key="subIndex1">
                                            <div class="cursor-pointer flex justify-between items-center py-2 px-3 hover:bg-neutral-100 border-t border-gray-100">
                                                <NuxtLink to="bestseller" class="hover:text-black"> {{subItem1.label}} </NuxtLink>
                                                <button>
                                                    <i v-if="subItem1.hasSubmenu" class="fa text-xs"></i>
                                                </button>                           
                                            </div>  
                                        </li>
                                    </ul>
                                </div>        
                            </li>
                        </ul>
                    </div>          
                </div>
            </li>           
        </ul>
    </div>              
</template>

<script setup lang="ts">

    //Data
    const menuItems = [
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

    const openSubMenuIndex = ref<number | null>(null); // null nghĩa là không có submenu nào mở
    function toggleColumnMenu(index: number) {
        openSubMenuIndex.value = openSubMenuIndex.value === index ? null : index;
    }

    const openSubMenuIndex1 = ref<number | null>(null); // null nghĩa là không có submenu nào mở
    function toggleColumnMenu1(index: number) {
        openSubMenuIndex1.value = openSubMenuIndex1.value === index ? null : index;
    }

</script>

<style lang="css" scoped>
    .text-xs {
        font-size: 8px !important;
    }
</style>