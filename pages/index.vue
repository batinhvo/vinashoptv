<template>
  <div>
    <BodyHomeMainSlider />
    <BodyHomeBestSeller />
    <BodyHomeMainSeller />
    <BodyHomeBigDiscount />
  </div>
</template>

<script setup lang="ts">
  fetch("https://vinashoptv.com/api/v1/products");
</script>
