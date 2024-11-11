<template>
  <div>
    <!-- Header -->
    <Header />

    <!-- Nội dung trang -->
    <main class="min-h-screen flex flex-col items-center justify-center py-10">
      <h1 class="text-4xl font-bold text-blue-600 mb-6">Chào mừng bạn đến với VinaShopTV!</h1>
      <p class="text-gray-700 text-lg mb-8 text-center">
        Đây là trang index với header .
      </p>
      <button class="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
        Khám phá ngay
      </button>
    </main>
  </div>
</template>

<script setup>
  import Header from '~/layouts/header.vue';
</script>

<style scoped>
/* Thêm style tùy chỉnh nếu cần */
</style>