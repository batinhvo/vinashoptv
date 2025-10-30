<template>
    <form @submit.prevent="onSearch" class="max-w-[900px] w-full">
        <div class="input-group flex px-5 relative" ref="dropdownRef">
            <input 
                type="search" 
                v-model="queryProducts"
                placeholder="Search for Products" 
                class="w-full border-2 border-r-0 border-primary rounded-l-full py-2 px-4 focus:outline-none"
                required
            />

            <!-- <input type="hidden" v-model="selectedCategory"/> -->

            <button 
                type="button" 
                @click.prevent="toggleOpenCategories" 
                class="min-w-40 border-y-2 border-primary text-gray-110 flex items-center justify-end pr-5"
                :aria-expanded="isOpenCategories">
                {{ selectedCategory }}
                <i class="fa fa-angle-down text-[8px] px-2"></i>
            </button>

            <div v-if="isOpenCategories" class="absolute max-w-72 min-w-44 max-h-80 min-h-36 bg-white top-11 right-10 shadow-lg z-40 border border-gray-100 rounded-lg overflow-hidden overflow-y-auto">
                <ul class="py-3">
                    <li class="py-1.5 hover:bg-neutral-100 px-5 cursor-pointer" @click="selectCategory('All categories')">                     
                        All categories
                    </li>
                    <li v-for="cate in filteredCategories" :key="cate.id" 
                    class="py-1.5 hover:bg-neutral-100 px-5 cursor-pointer" @click="selectCategory(cate.name)">                     
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
    import type { Category } from 'types/categoryTypes';

    const router = useRouter();
    const cateStore = useCateStore();

    //trạng thái lưu trữ
    const queryProducts = ref("");
    const selectedCategory = ref("All categories");
    const isOpenCategories = ref(false);
    const dropdownRef = ref<HTMLElement | null>(null);

    // Lọc bỏ category "SPECIAL"
    const filteredCategories = computed(() =>
        cateStore.categories.filter((cate: Category) => cate.name !== "SPECIAL")
    );

    const toggleOpenCategories = () => {
        isOpenCategories.value = !isOpenCategories.value;
    };

    const selectCategory = (category: string) => {
        selectedCategory.value = category;
        isOpenCategories.value = false;
    };

    // ✅ Đóng dropdown khi click ra ngoài
    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.value &&
            !dropdownRef.value.contains(event.target as Node)
        ) {
            isOpenCategories.value = false;
        }
    };

    onMounted(() => {
        document.addEventListener("click", handleClickOutside);
    });

    onBeforeUnmount(() => {
        document.removeEventListener("click", handleClickOutside);
    });

    // Xử lý tìm kiếm
    const onSearch = () => {
        const keyword = queryProducts.value.trim();
        if (!keyword) return;

        const selectedCate =
            selectedCategory.value !== "All categories"
            ? cateStore.categories.find(
                (cate: Category) => cate.name === selectedCategory.value
                )
            : null;

        router.push({
            path: "/search",
            query: {
            ...(selectedCate?.slug && { category: selectedCate.slug }),
            keyword,
            },
        });
    };
</script>

<style scoped>
    .text-2xl {
        font-size: 1.5rem !important;
    }
</style>
