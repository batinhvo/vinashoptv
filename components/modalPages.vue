<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-5">
        <div class="bg-white rounded-lg shadow-lg lg:min-w-96 max-h-[900px]">
            <button @click="closeModal" class="w-full flex justify-end text-base text-gray-400 hover:text-red-500 pt-3 pr-4">
                <i class="fa fa-times" aria-hidden="true"></i>
            </button>
            <h2 v-if="title" class="text-lg font-bold pl-6">{{ title }}</h2>
            <div class="px-4 max-h-[750px] overflow-auto ">
                <slot name="body"></slot>
            </div>    
            <div class="flex justify-end p-2">
                <slot name="actions"></slot>
            </div>        
        </div>
    </div>
</template>

<script setup lang="ts">

    defineProps<{
        title?: string;
    }>();

    const emit = defineEmits(['close']);
    const isOpen = ref(true);

    if(isOpen) {
        document.body.classList.add('overflow-hidden'); 
    }

    const closeModal = () => {
        isOpen.value = false;
        document.body.classList.remove('overflow-hidden'); 
        emit('close');
    };
</script>