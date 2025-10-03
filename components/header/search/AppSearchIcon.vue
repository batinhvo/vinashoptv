<template>
    <div>
        <button type="button" @click="toggleOpenSearch" class="py-2 px-2 text-black flex items-center justify-center text-font-22">
            <i class="ec ec-search"></i>
        </button>
    </div>

    <div v-if="isSearchVisible" class="flex items-center absolute min-w-36 inset-x-0 top-12 h-20 m-2 z-40 bg-white border border-gray-200 rounded-md shadow-[0_2px_5px_rgba(0,0,0,0.28)] search" :class="[isOpenSearch ? 'show' : '']">
        <form @submit.prevent="onSearch" class="max-w-[650px] w-full">
            <div class="input-group flex px-5">
                <input 
                type="search" 
                v-model="queryProducts"
                placeholder="Search for Products" 
                class="w-full border border-gray-300 rounded-l-full py-2 px-4 focus:outline-none focus:border-blue-300"
                required
                />
                <button type="submit" class="bg-primary px-4 rounded-r-full">
                    <i class="ec ec-search text-2xl text-green-022"></i>
                </button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">

    const isOpenSearch = ref(false);
    const isSearchVisible = ref(false);

    function toggleOpenSearch() {
        if(isOpenSearch.value) {
            isOpenSearch.value = false;
            setTimeout(() => {
                isSearchVisible.value = false;
            }, 500);
        } else {
            isOpenSearch.value = true;
            isSearchVisible.value = true;
        }
    }

    //---------------------------API------------------------------//

    const router = useRouter();

    //trạng thái lưu trữ
    const queryProducts = ref(""); 
    const keywordQuery = ref('');
    
    // Xử lý tìm kiếm
    const onSearch = () => {
        const keyword = queryProducts.value.trim();
        if (!keyword) return; // Không tìm nếu keyword rỗng
        keywordQuery.value = keyword;
        // Chuyển hướng với query params
        router.push({
            path: "/search",
            query: {
                keyword: keywordQuery.value,
            },
        });
    };

</script>

<style lang="css" scoped>

    .search {
        opacity: 0;
        overflow: hidden;
        animation: fadeDownEffect .3s ease-out forwards; 
    }

    .search.show {
        opacity: 1;
        animation: fadeUpEffect .3s ease-out forwards; 
    }

    @keyframes fadeUpEffect {
        from {
            opacity: 0;
            transform: translateY(20%);
        }
        to {
            opacity: 1;
            transform: translateY(0px);
        }
    }

    @keyframes fadeDownEffect {
        from {
            opacity: 1;
            transform: translateY(0px);
        }
        to {
            opacity: 0;
            transform: translateY(20%);
        }
    }
</style>
