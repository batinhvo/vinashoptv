<template>
    <div :class="['w-full mb-6 xl:px-2', widthfull ? '' : 'xl:w-1/2']">
        <label :for="name" class="font-bold ml-3 block">{{ label }}</label>
        <Field 
        v-bind="$attrs"
        v-model="computedModelValue"
        :name="name"
        :type="type"
        :placeholder="placeholder"
        class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm appearance-none focus:outline-none focus:border-blue-300 disabled:bg-zinc-50
        disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
        :class="[!meta.valid && meta.touched ? 'bg-red-100' : '']"/>
        <ErrorMessage :name="name" class="text-red-500 mt-2 text-xs pl-4"/>
        
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        name: { type: String, required: true },
        label: { type: String, required: true },
        type: { type: String, default: 'text' },
        widthfull: { type: Boolean, default: true },
        placeholder: { type: String, default: '' },
        rules: { type: String, default: '' },
        modelValue: { type: String, required: true },
    });

    const { value: fieldValue, meta } = useField(props.name, props.rules)
    const emit = defineEmits(['update:modelValue'])
    const computedModelValue = computed({
        get: () => fieldValue.value,
        set: (val: string) => {
            emit('update:modelValue', val)
        },
    })

    watch(computedModelValue, () => {
        meta.valid = fieldValue.value ? true : false; // This is just an example logic.
    })
    //dirty (người dùng có chỉnh sửa gì không - ứng dụng: có lưu lại khi thoát ?)
</script>