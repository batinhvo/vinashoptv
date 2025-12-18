<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-5">

        <div class="bg-white rounded-lg shadow-lg lg:min-w-96 max-h-[90vh] flex flex-col">
            <button @click="closeModal" class="w-full flex justify-end text-base text-gray-400 hover:text-red-500 pt-3 pr-4">
                <i class="fa fa-times" aria-hidden="true"></i>
            </button>
            <h2 v-if="title" class="text-lg font-bold pl-6">{{ title }}</h2>

            <!-- BODY SCROLL ONLY -->
            <div class="flex-1 overflow-auto px-4 py-4">
                <slot name="body"></slot>
            </div>

            <div class="flex justify-end p-2">
                <slot name="actions"></slot>
            </div>        

            <!-- Header -->
            
                <!-- <h2 v-if="title" class="text-lg font-bold">
                    {{ title }}
                </h2>
                <button
                    @click="closeModal"
                    class="text-base text-gray-400 hover:text-red-500"
                >
                    <i class="fa fa-times" aria-hidden="true"></i>
                </button> -->
            

            <!-- Body (SCROLL HERE) -->
            <!-- <div class="flex overflow-auto px-4 py-4">
                <slot name="body"></slot>
            </div> -->

            <!-- Footer / Actions -->
            <!-- <div class="px-4 py-1 flex justify-end rounded-lg">
                <slot name="actions"></slot>
            </div> -->
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
