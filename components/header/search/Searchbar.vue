<template>
    <form @submit.prevent="onSearch" class="max-w-[650px] w-full">
        <div class="input-group flex px-5">
            <input 
            type="search" 
            v-model="query"
            placeholder="Search for Products" 
            class="w-full border-2 border-primary rounded-l-full py-2 px-4 focus:outline-none"
            />
            <button type="submit" class="bg-primary px-4 rounded-r-full">
                <i class="ec ec-search text-2xl text-green-022"></i>
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
    //test
    const notify = useNotify();

    const query = ref(""); //trạn thái lưu trữ
    
    function onSearch() {
        if(query.value.trim()) {
            notify({
                message: "Search: " + query.value,
                type: "info",
                time: 2000
            });
        }
    }
</script>

<style scoped>
    .text-2xl {
        font-size: 1.5rem !important;
    }
</style>