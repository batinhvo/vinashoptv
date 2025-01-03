<template>
    <div>
        <Header />
        <slot />
        <Footer />
    </div>
</template>

<script setup lang="ts">
    const { loadUser } = useAuth();
    loadUser();
</script>