<template>
    <div class="bg-neutral-100 border border-zinc-200 p-1 rounded-lg relative">
        <button class="w-56` h-10 px-5 rounded-full flex items-center justify-between border" :class="[isOpenSort ? 'bg-white border-neutral-200' : 'bg-zinc-100 border-neutral-300']" @click="toggleOpenSort()">
            <div class="text-neutral-500 overflow-hidden whitespace-nowrap w-11/12 text-left"> {{ selectedSort }} </div>       
            <i class="fa fa-angle-down text-[9px] text-neutral-500 pl-1.5"></i>                    
        </button>
        <div v-if="isOpenSort" class="absolute z-40 top-15 mt-2 bg-white shadow-lg border border-gray-100 rounded-lg">
            <ul class="py-2 px-1">
                <li class="px-4 py-1 hover:bg-gray-100 rounded cursor-pointer" @click="setSort('Default Sorting')">Default Sorting</li>
                <li class="px-4 py-1 hover:bg-gray-100 rounded cursor-pointer" @click="setSort('Sort by Price: Low to Hight')">Sort by Price: Low to Hight</li>
                <li class="px-4 py-1 hover:bg-gray-100 rounded cursor-pointer" @click="setSort('Sort by Price: Hight to Low')">Sort by Price: Hight to Low</li>
                <li class="px-4 py-1 hover:bg-gray-100 rounded cursor-pointer" @click="setSort('Sort by Lates')">Sort by Lates</li>         
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
    const isOpenSort = ref(false);
    function toggleOpenSort() {
        isOpenSort.value = !isOpenSort.value;
    }

    const emit = defineEmits(['updateParams']);
    const selectedSort = ref('Default Sorting');
    const descending = ref(0);
    const sortBy = ref('');

    const route = useRoute();

    function setSort(sortOption: string) {
        isOpenSort.value = false;
        selectedSort.value = sortOption;
        let sortQuery: string | undefined = undefined;

        switch (sortOption) {
            case 'Default Sorting':
                sortBy.value = 'createdAt';
                sortQuery = undefined; // Xóa sort khỏi URL
                break;
            case 'Sort by Price: Low to Hight':
                sortBy.value = 'price';
                descending.value = 1;
                sortQuery = 'price_from_low';
                break;
            case 'Sort by Price: Hight to Low':
                sortBy.value = 'price';
                descending.value = 0;
                sortQuery = 'price_from_high';
                break;
            case 'Sort by Lates':
                sortBy.value = 'createdAt';
                descending.value = 1;
                sortQuery = 'latest';
                break;
        } 

        // Cập nhật URL
        navigateTo({ 
            path: route.path, 
            query: { ...route.query, sort: sortQuery } // Giữ nguyên các query khác
        }, { replace: true });

        emit('updateParams', sortBy.value, descending.value);
    }
</script>