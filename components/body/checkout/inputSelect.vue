<template>
    <div class="relative pt-3">
        <button 
            class="py-3 px-5 w-full rounded-full flex items-center justify-between border bg-white" 
            @click.prevent="toggleOpen"
        >
            <input 
            class="text-neutral-500 overflow-hidden whitespace-nowrap w-11/12 text-left focus:outline-none cursor-pointer" 
            :value="selectedOption" 
            readonly
            />
            <i class="fa fa-angle-down text-[9px] text-neutral-500 pl-1.5"></i>
        </button>
        
        <div v-if="isOpen" class="absolute z-40 w-full top-15 mt-1 bg-white shadow-lg border border-gray-100 rounded-lg max-h-40 overflow-y-auto">
            <ul class="py-2 px-1">
                <li 
                    v-for="(option, index) in options" 
                    :key="index" 
                    class="px-4 py-1 hover:bg-gray-100 rounded cursor-pointer" 
                    @click.prevent="setOption(option)"
                >
                    {{ option }}
                </li>
            </ul>
        </div>
    </div>
</template>
  
<script setup lang="ts">
    const props = defineProps({
        options: {
            type: Array as PropType<string[]>,
            required: true
        },
        defaultOption: {
            type: String,
        default: ''
        }
    });
  
    const emit = defineEmits<{
        (event: 'update:selectedOption', option: string): void;
    }>();

    const isOpen = ref(false);
    const selectedOption = ref(props.defaultOption);
  
    function toggleOpen() {
        isOpen.value = !isOpen.value;
    }
  
    function setOption(option: string) {
        selectedOption.value = option;
        isOpen.value = false;
        emit('update:selectedOption', option);
    }
</script>