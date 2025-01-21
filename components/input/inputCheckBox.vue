<template>
    <div :class="['w-full mb-6 xl:px-4', widthfull ? '' : 'xl:w-1/2']">
        <div class="flex flex-wrap items-center">
            <Field type="checkbox" :id="name" :name :rules :checked="modelValue" @change="onCheckboxChange($event.target.checked)" class="accent-[#169100]"/>
            <label :for="name" class="font-bold ml-3 block"><span v-if="isStrong" class="text-red-500">*</span> {{ label }}</label>
        </div>
        <ErrorMessage :name="name" class="text-red-500 mt-2 text-xs pl-8"/>
    </div>
</template>

<script setup lang="ts">
    import { useField } from 'vee-validate';

    const props = defineProps({
        widthfull: { type: Boolean, default: false },
        isStrong: { type: Boolean, default: true },
        name: { type: String, required: true },
        label: { type: String, required: true },
        rules: { type: String, default: '' },
        modelValue: { type: Boolean, required: true },
    });

    // Đồng bộ giá trị của checkbox với v-model
    const emit = defineEmits(['update:modelValue']);

    // Sử dụng useField từ VeeValidate để xử lý validation
    const { handleChange } = useField(() => props.name, props.rules, {
        type: 'checkbox',
        checkedValue: false,
    });

    // Cập nhật giá trị khi checkbox thay đổi
    const onCheckboxChange = (value: boolean) => {
        emit('update:modelValue', value); // Cập nhật giá trị cho v-model
        handleChange(value); // Gọi handleChange từ VeeValidate để xử lý validation
    };
</script>
