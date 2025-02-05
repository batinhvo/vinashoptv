<template>
    <div class="container mx-auto">
      <div class="mt-0 md:mt-10">
        <ul class="flex items-center bg-zinc-100 md:bg-white pl-2 xl:pl-0">
          <li class="px-3 py-2 hover:bg-zinc-100 rounded hover:border hover:border-gray-200"><a href="/">Home</a></li>
          <li class="px-2"><i class="ec ec-arrow-right-categproes"></i></li>
          <li class="px-3 py-2 md:bg-zinc-100 hover:bg-gray-200 rounded md:border md:border-gray-100"><NuxtLink to="/about">About Us</NuxtLink></li>
        </ul>
      </div>
      <div class="my-10 px-5 text-justify xl:px-0" v-html="aboutContent"></div> 
    </div>
</template>

<script setup lang="ts">

  const aboutStore = useContent();
  const aboutContent = ref('');

  onMounted(async () => {
    await aboutStore.fetchContent();
    aboutContent.value = aboutStore.contents[0].content;
  });

</script>
