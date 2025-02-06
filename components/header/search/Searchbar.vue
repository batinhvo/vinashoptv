<template>
    <form @submit.prevent="onSearch" class="max-w-[700px] w-full">
        <div class="input-group flex px-5 relative">
            <input 
            type="search" 
            v-model="query"
            placeholder="Search for Products" 
            class="w-full border-2 border-r-0 border-primary rounded-l-full py-2 px-4 focus:outline-none"
            />

            <input type="hidden" v-model="selectedCategory"/>

            <button @click="toggleOpenCategories" class="min-w-40 border-y-2 border-primary text-gray-110 flex items-center justify-end pr-5"
                :aria-expanded="isOpenCategories ? 'true' : 'false'">
                {{ selectedCategory }}
                <i class="fa fa-angle-down text-[8px] px-2"></i>
            </button>

            <div v-show="isOpenCategories" class="absolute max-w-72 min-w-44 max-h-80 min-h-36 bg-white top-11 right-10 shadow-lg z-40 border border-gray-100 rounded-lg overflow-hidden overflow-y-auto">
                <ul class="py-3">
                    <li v-for="(item, index) in cateParent" :key="index" class="py-1.5 hover:bg-neutral-100 px-5 cursor-pointer" @click="selectCategory(item)">
                        {{item}}
                    </li>
                </ul>
            </div>

            <button type="submit" class="bg-primary px-4 rounded-r-full">
                <i class="ec ec-search text-2xl text-green-022"></i>
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
    
    const notify = useNotify();
    const query = ref(""); //trạn thái lưu trữ
    const isOpenCategories = ref(false);
    const selectedCategory = ref("All categories");

    //test
    function onSearch() {
        if(query.value.trim()) {
            notify({
                message: "Search: " + query.value + " in " + selectedCategory.value,
                type: "info",
                time: 2000
            });
        }
    }

    //show categories
    function toggleOpenCategories() {
        isOpenCategories.value =  !isOpenCategories.value;
    }

    function selectCategory(category: string) {
        selectedCategory.value = category; // Cập nhật category đã chọn       
        toggleOpenCategories(); // Đóng dropdown sau khi chọn
    }  

    //-----------------------------API--------------------------------------//

    const cateStore = useCateStore();

    const cateParent = ref<string[]>(['All categories',]);

    onMounted( async () => {
        await cateStore.fetchCate();
        const filteredCate  = cateStore.categories.filter((cate) => cate.parentId === 0).sort((a, b) => a.sort - b.sort).map((cate) => cate.name);
        cateParent.value = [...cateParent.value, ...filteredCate];
    });
    
</script>

<style scoped>
    .text-2xl {
        font-size: 1.5rem !important;
    }
</style>