<template>
    <div class="flex flex-wrap text-center py-4 mt-8 border-t border-gray-100">
        <div class="w-full lg:w-1/2 lg:text-left">
            <p>Showing {{ from }}-{{ to }} of {{ data.dataTotalPro }} results</p>
        </div>
        <div class="w-full lg:w-1/2 mt-4 lg:mt-0 lg:text-right">
            <button @click.prevent="prePages" class="btn text-white bg-primary py-1.5 px-4 rounded-md hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)] duration-300 mr-2">Previous</button>
            <input @change="jumpToPage" @keyup.enter="jumpToPage" v-model="pageInput" type="number" class="w-12 h-8 text-center border border-gray-200 rounded-md bg-[#fafafa]">
            <input type="text" class="w-4 h-8 text-center rounded-md mx-1" value="/">
            <input type="text" class="w-12 h-8 text-center border border-gray-200 rounded-md" :value="pages" disabled>
            <button @click.prevent="nextPages" class="btn text-white bg-primary py-1.5 px-4 rounded-md hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)] duration-300 ml-2">Next</button>
        </div>                       
    </div>
</template>

<script setup lang="ts">

    const data = defineProps<{ 
        dataTotalPro: number,
        updateSort: boolean,
    }>();
    const emit = defineEmits(['updatePages', 'updateRange', 'resetUpdateSort']);

    const page = ref(1);
    const itemsPerPage = 8;
    const pageInput = ref(page.value);
    
    const from = computed(() => (page.value - 1) * itemsPerPage + 1);
    const to = computed(() => Math.min(page.value * itemsPerPage, data.dataTotalPro));

    const pages = computed(() => Math.ceil((data.dataTotalPro ?? 1) / itemsPerPage));

    watch([from, to], () => {
        emit('updateRange', { from: from.value, to: to.value });
    });
    
    const nextPages = () => {
        if(page.value < pages.value) page.value ++;
        emit('updatePages', page.value);
    }

    const prePages = () => {
        if(page.value > 1) page.value --;
        emit('updatePages', page.value);
    }

    const jumpToPage = () => {
        let newPage = Number(pageInput.value);

        // Kiểm tra giá trị nhập hợp lệ
        if (isNaN(newPage) || newPage < 1) newPage = 1;
        if (newPage > pages.value) newPage = pages.value;

        page.value = newPage; // Cập nhật trang hiện tại
        pageInput.value = newPage; // Cập nhật lại input
        emit('updatePages', page.value); // Gửi event cập nhật
    };

    watch(() => data.updateSort, (newVal) => {
        if (newVal) {
            page.value = 1;    
            emit('updatePages', 1);
            emit('resetUpdateSort');
        }
    });

    watch(page, (newVal) => {
        pageInput.value = newVal;
    });

    onMounted(() => {
        emit('updateRange', { from: from.value, to: to.value });
    });
</script>

<style lang="css" scoped>
    input[type="number"]::-webkit-inner-spin-button, 
    input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    input[type="number"] {
        -moz-appearance: textfield; /* Ẩn trên Firefox */
        appearance: none;
    }
</style>