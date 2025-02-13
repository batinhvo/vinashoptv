<template>
    <form @submit.prevent="onSearch" class="max-w-[700px] w-full">
        <div class="input-group flex px-5 relative">
            <input 
            type="search" 
            v-model="queryProducts"
            placeholder="Search for Products" 
            class="w-full border-2 border-r-0 border-primary rounded-l-full py-2 px-4 focus:outline-none"
            required
            />

            <input type="hidden" v-model="selectedCategory"/>

            <button @click.prevent="toggleOpenCategories" class="min-w-40 border-y-2 border-primary text-gray-110 flex items-center justify-end pr-5"
                :aria-expanded="isOpenCategories ? 'true' : 'false'">
                {{ selectedCategory }}
                <i class="fa fa-angle-down text-[8px] px-2"></i>
            </button>

            <div v-if="isOpenCategories" class="absolute max-w-72 min-w-44 max-h-80 min-h-36 bg-white top-11 right-10 shadow-lg z-40 border border-gray-100 rounded-lg overflow-hidden overflow-y-auto">
                <ul class="py-3">
                    <li class="py-1.5 hover:bg-neutral-100 px-5 cursor-pointer" @click="selectCategory('All categories')">                     
                        All categories
                    </li>
                    <li v-for="cate in cateParent" :key="cate.id" class="py-1.5 hover:bg-neutral-100 px-5 cursor-pointer" @click="selectCategory(cate.name)">                     
                        {{ cate.name }}
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

    const router = useRouter();
    const cateStore = useCateStore();

    //trạng thái lưu trữ
    const queryProducts = ref(""); 
    const categoryQuery = ref(''); 
    const keywordQuery = ref('');

    const isOpenCategories = ref(false);
    const selectedCategory = ref("All categories");

    const cateParent = computed(() => {
        return cateStore.categories.filter((cate) => cate.parentId === 0).sort((a, b) => a.sort - b.sort);
    });

    //show categories
    function toggleOpenCategories() {
        isOpenCategories.value =  !isOpenCategories.value;
    }

    function selectCategory(category: string) {
        selectedCategory.value = category; // Cập nhật category đã chọn       
        toggleOpenCategories(); // Đóng dropdown sau khi chọn
    }  

    // Fetch danh mục trước khi sử dụng
    const fetchDataCategories =  async () => {
        await cateStore.fetchCategories();
    };
    
    fetchDataCategories();

    // Xử lý tìm kiếm
    const onSearch = () => {
        const keyword = queryProducts.value.trim();
        if (!keyword) return; // Không tìm nếu keyword rỗng

        keywordQuery.value = keyword;

        // Nếu chọn category khác "All categories", lấy slug
        if (selectedCategory.value !== "All categories") {
            const selectedCate = cateStore.categories.find(
                (cate) => cate.name === selectedCategory.value
            );
            categoryQuery.value = selectedCate ? selectedCate.slug : "";
        } else {
            categoryQuery.value = "";
        }

        // Chuyển hướng với query params
        router.push({
            path: "/search",
            query: {
                ...(categoryQuery.value && { category: categoryQuery.value }),
                keyword: keywordQuery.value,
            },
        });
    };

    

    
</script>

<style scoped>
    .text-2xl {
        font-size: 1.5rem !important;
    }
</style>