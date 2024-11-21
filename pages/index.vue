<template>
  <div>
    <!-- Header -->
    <Header />

    <!-- Main Home -->
    <Slider />
    <BestSeller />
    <MainSeller />
    <BigDiscount />

    <!-- footer -->
     <Footer />
  </div>
</template>

<script setup>
  import Header from '~/layouts/header.vue';
  import Footer from '~/layouts/footer.vue';
</script>

<style scoped>
/* Thêm style tùy chỉnh nếu cần */
</style>