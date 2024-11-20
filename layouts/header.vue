<template>
    <header class="bg-white shadow-sm">
        <!-- top-header -->
        <Topbar />
        <!-- main-header -->
        <div class="container mx-auto">
            <div class="flex items-center py-2 xl:py-8">
                <Logo />
                <Searchbar />
                <CartIcon />
            </div>
            <!-- menu -->
            <div class="flex items-center">
                <MenuDropdown />
                <Menubar />
            </div>
        </div>
        <!-- slider -->
        
            
  
        <!-- Nút Menu cho thiết bị di động -->
        <!-- <button @click="toggleMenu" class="md:hidden text-gray-600 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
        </button> -->       
  
      <!-- Menu di động -->
      <!-- <div v-if="isOpen" class="md:hidden bg-gray-100 px-6 py-4">
        <ul class="space-y-4">
          <li><a href="#" class="block hover:text-blue-500">Trang Chủ</a></li>
          <li><a href="#" class="block hover:text-blue-500">Giới Thiệu</a></li>
          <li><a href="#" class="block hover:text-blue-500">Dịch Vụ</a></li>
          <li><a href="#" class="block hover:text-blue-500">Liên Hệ</a></li>
        </ul>
      </div> -->
    </header>
</template>
  
<script setup lang="ts">
    import { ref } from 'vue';
    const isOpen = ref(false);
    const toggleMenu = () => {
        isOpen.value = !isOpen.value;
    };
</script>