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
            <MenuDropdown />
            <!-- <div class="flex items-center">
                <div class="max-w-[270]">
                    <button type="button" class="flex max-w-[270] btn btn-primary bg-primary py-4 px-6 rounded-t-lg items-center leading-none font-bold">
                        <span class="fa fa-list-ul mr-2"></span>
                        <span class="pl-1">All Departments</span>
                    </button>
                    <div class="list-menu absolute max-w-[270] hidden">
                        <ul class="px-3 py-2 w-full">
                            <li class="border-b relative py-2 px-1 hover:bg-neutral-100"><a href="#" class="font-black hover:text-black">Sale Off</a></li>
                            <li class="border-b relative py-2 px-1 hover:bg-neutral-100"><a href="#" class="font-black hover:text-black">SPECIAL</a></li>
                            <li class="border-b relative flex justify-between items-center py-2 px-1 hover:bg-neutral-100"><a href="#" class="hover:text-black hover:font-black">Ginseng-LINGZHI</a><i class="fa fa-angle-right text-neutral-400"></i></li>       
                            <li class="border-b relative flex justify-between items-center py-2 px-1 hover:bg-neutral-100"><a href="#" class="hover:text-black hover:font-black">Supplements</a><i class="fa fa-angle-right text-neutral-400"></i></li>                            
                            <li class="border-b relative flex justify-between items-center py-2 px-1 hover:bg-neutral-100"><a href="#" class="hover:text-black hover:font-black">Food & Drink</a><i class="fa fa-angle-right text-neutral-400"></i></li>                            
                            <li class="border-b relative flex justify-between items-center py-2 px-1 hover:bg-neutral-100"><a href="#" class="hover:text-black hover:font-black">Skin Care</a><i class="fa fa-angle-right text-neutral-400"></i></li>                            
                            <li class="border-b relative flex justify-between items-center py-2 px-1 hover:bg-neutral-100"><a href="#" class="hover:text-black hover:font-black">Hair Care</a><i class="fa fa-angle-right text-neutral-400"></i></li>                            
                            <li class="border-b relative flex justify-between items-center py-2 px-1 hover:bg-neutral-100"><a href="#" class="hover:text-black hover:font-black">Electronics +</a><i class="fa fa-angle-right text-neutral-400"></i></li>
                            <li class="border-b relative flex justify-between items-center py-2 px-1 hover:bg-neutral-100"><a href="#" class="hover:text-black hover:font-black">Masks & Sanitizer</a><i class="fa fa-angle-right text-neutral-400"></i></li>                                                 
                        </ul>
                    </div>
                </div>
                <div class="pl-7">
                    <ul class="hidden md:flex space-x-8">
                        <li><a href="#" class="font-black hover:text-black">Home</a></li>
                        <li><a href="#" class="font-black hover:text-black">About Us</a></li>
                        <li><a href="#" class="font-black hover:text-black">Contact</a></li>
                        <li><a href="#" class="font-black hover:text-black">Toll free: 1-855-855-5888</a></li>
                    </ul>
                </div>
            </div> -->
        </div>
            
  
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