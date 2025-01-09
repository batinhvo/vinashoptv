<template>
    <div :class="['w-full mb-6 xl:px-2', widthfull ? '' : 'xl:w-1/2']">
        <label :for="id" class="font-bold ml-3 block">{{ label }}</label>
        <input v-bind="$attrs"             
            :id="id"      
            :name="name"      
            :type="type"
            :placeholder="placeholder"
        class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm appearance-none focus:outline-none focus:border-blue-300 disabled:bg-zinc-50
        disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none">
        <span v-if="errors && errors.trim()" class="text-red-500 text-sm">{{ errors }}</span>
    </div>
</template>

<script setup lang="ts">
    defineProps({
        id: {type: String, default: ''},
        name: {type: String, default: ''},
        label: {type: String, default: ''},
        modelValue: { type: [String, Number], default: '' },
        type: { type: String, default: 'text' },
        widthfull: {type: Boolean, default: true},
        placeholder: {type: String, default: ''},
        errors: String
    });
</script>