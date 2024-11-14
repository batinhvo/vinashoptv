<template>
    <div class="relative">
        <button @click="toggleMenu" class="btn btn-primary bg-primary px-6 py-3 flex items-center font-black w-[270px] rounded-t-lg">
            <i class="fa fa-list-ul mr-2"></i> All Departments
        </button>
        <transition name="fade">
            <div v-show="isMenuOpen" ref="menu" class="list-menu absolute bg-white shadow-lg rounded-b-lg w-[270px] z-50">
                <ul class="p-2">
                    <li v-for="(item, index) in menuItems" :key="index" class="border-b py-1.5 px-4 hover:bg-neutral-100 cursor-pointer relative group">
                        <a href="#" :class="['block flex justify-between items-center hover:text-black hover:font-black', (item.label === 'Sale Off' || item.label === 'SPECIAL') ? 'font-black' : '']">{{ item.label }}
                            <i v-if="item.hasSubmenu" class="fa fa-angle-right text-neutral-400"></i>
                        </a>
                        <!-- Submenu cho các mục có submenu -->
                        <transition name="fade">
                        <ul 
                            v-if="item.hasSubmenu" 
                            class="submenu bg-white shadow-md absolute top-0 left-full mt-0 w-[270px] z-50 top-0"
                        >
                            <li 
                            v-for="(subItem, subIndex) in skinCareSubItems" 
                            :key="subIndex" 
                            class="border-b py-1.5 px-4 hover:bg-neutral-100 cursor-pointer relative"
                            >
                            <a href="#" class="block">{{ subItem }}</a>
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
    const isSubMenuOpen = ref(false);
    const menu = ref<HTMLElement | null>(null);
    const menuItems = [
        { label: 'Sale Off', hasSubmenu: false },
        { label: 'SPECIAL', hasSubmenu: false },
        { label: 'Ginseng-LINGZHI', hasSubmenu: true },
        { label: 'Supplements', hasSubmenu: true },
        { label: 'Food & Drink', hasSubmenu: true },
        { label: 'Skin Care', hasSubmenu: true },
        { label: 'Hair Care', hasSubmenu: true },
        { label: 'Electronics +', hasSubmenu: true },
        { label: 'Masks & Sanitizer', hasSubmenu: true }
    ];

    const GinsengSubItems = ['Black Ginseng', 'Lingzhi', 'Red Ginseng', 'Other Ginseng Types'];

    const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value;
    }
</script>

<style lang="css" scoped>
.submenu {
  opacity: 0;
}

.group:hover .submenu {
  opacity: 1;
}
</style>


  