<template>
    <div class="w-full mb-6 xl:px-2" :class="[widthfull ? '' : 'xl:w-1/2']">
        <label :for="id" class="font-bold ml-3 block">{{ label }}</label>
        <input v-bind="$attrs"             
            :id="id" 
            :name="id"
            :value="modelValue"
            @input="$emit('update:modelValue', $event)"
            :placeholder="placeholder"
        class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm appearance-none focus:outline-none focus:border-blue-300 disabled:bg-zinc-50
        disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none">
    </div>
</template>

<script setup lang="ts">
    defineProps({
        id: String,
        label: String,
        modelValue: {type: String, default: ''},
        type: { type: String, default: 'text' },
        widthfull: {type: Boolean, defaul: false},
        placeholder: {type: String, default: ''},
    });
</script>