<template>
    <div>
        <button 
            v-if="showButton" 
            @click="scrollToTop" 
            class="fixed bottom-5 right-5 btn btn-primary bg-primary px-3 py-2 rounded-lg font-bold shadow-sm opacity-50 hover:opacity-100 hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)] hover:-translate-y-1 duration-300">
            <i class="fa fa-arrow-up" aria-hidden="true"></i>
        </button>
    </div>
</template>
  
<script setup lang="ts">

    const showButton = ref(false);
    
    const handleScroll = () => {
        showButton.value = window.scrollY > 200;
    };
    
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    onMounted(() => {
        window.addEventListener('scroll', handleScroll);
    });
    
    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
    });
</script>
  
<style scoped>
    button {
        transition: opacity 0.3s ease-in-out;
    }
</style>
  