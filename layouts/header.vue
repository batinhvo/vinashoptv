<template>
    <header class="bg-white shadow-md">
        <!-- top-header -->
        <div class="border-b border-gray-100 py-2"> 
            <div class="container max-w-xl flex justify-between">
                <div class="topbar-left">
                    <a class="text-gray-110 text-font-13" href="https://beta.vinashoptv.com/">Welcome to Vinashop</a>
                </div>
                <div class="topbar-right">
                    <a class="text-green-334 text-font-13" href="https://beta.vinashoptv.com/"><i class="ec ec-map-pointer text-font-18 mr-1"></i> Store Locator</a>
                    <span class="text-gray-5 mx-4">|</span>
                    <a class="text-green-334 text-font-13" href="https://beta.vinashoptv.com/"><i class="ec ec-user text-font-18 mr-1"></i> Register <span class="text-gray-50">or</span> Sign in</a>
                </div>
            </div>
        </div>
        <!-- main-header -->
        <div class="container mx-auto flex items-center px-6 py-2 xl:py-8">
            <!-- Logo -->
            <nav class="max-width-270 w-2/6">           
                <a class="logo" href="/">
                    <img src="/images/logo-01.png" alt="">
                </a>
            </nav>
            <!-- search -->
            <div class="w-3/6">
                <form action="">
                    <div class="input-group flex">
                        <input type="search" class="border-2 border-primary rounded-bl-full rounded-tl-full text-font-15 h-10 py-2 pl-5 w-full" placeholder="Search for Products">
                        <button class="btn btn-primary bg-primary px-3 py-2 h-10 rounded-br-full rounded-tr-full"><span class="ec ec-search text-font-24 text-green-022" aria-hidden="true"></span></button>
                    </div>
                </form>
            </div>
  
            <!-- Menu chính -->
            <!-- <ul class="hidden md:flex space-x-8">
                <li><a href="#" class="hover:text-blue-500">Trang Chủ</a></li>
                <li><a href="#" class="hover:text-blue-500">Giới Thiệu</a></li>
                <li><a href="#" class="hover:text-blue-500">Dịch Vụ</a></li>
                <li><a href="#" class="hover:text-blue-500">Liên Hệ</a></li>
            </ul> -->
  
            <!-- Nút Menu cho thiết bị di động -->
            <!-- <button @click="toggleMenu" class="md:hidden text-gray-600 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button> -->        
        </div>
        
  
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
  
  <style scoped>
  /* Bạn có thể tùy chỉnh thêm nếu cần */
  </style>