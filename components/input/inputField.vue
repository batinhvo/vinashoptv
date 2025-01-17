<template>
    <div :class="['w-full mb-6 xl:px-2', widthfull ? '' : 'xl:w-1/2']">
        <label :for="name" class="font-bold ml-3 block">{{ label }} <span v-if="isStrong" class="text-red-500">*</span></label>
        <Field 
        v-bind="$attrs"
        v-model="modelValue"
        :name
        :type
        :rules
        :placeholder
        class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm appearance-none focus:outline-none focus:border-blue-300 disabled:bg-zinc-50
        disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
        :class="[!meta.valid && meta.touched ? 'border-red-500' : 'border-gray-300']"/>
        <ErrorMessage :name="name" class="text-red-500 mt-2 text-xs pl-4"/>
    </div>
</template>

<script setup lang="ts">
    import { defineRule } from 'vee-validate';
    import axios from 'axios';

    const props = defineProps({
        name: { type: String, required: true },
        label: { type: String, required: true },
        type: { type: String, default: 'text' },
        widthfull: { type: Boolean, default: false },
        placeholder: { type: String, default: '' },
        rules: { type: String, default: '' },
        modelValue: { type: String, required: true },
        isStrong: { type: Boolean, default: true}
    });

    const { value: fieldValue, meta } = useField(props.name, props.rules);
    const modelValue = defineModel();
    watch(modelValue, () => {
        meta.valid = fieldValue.value ? true : false; // This is just an example logic. 
    })
    //dirty (người dùng có chỉnh sửa gì không - ứng dụng: có lưu lại khi thoát ?)

    const checkEmailExist = async (email: string): Promise<boolean> => {
        try {
        const emailResponse = await axios.post('https://vinashoptv.com/api/v1/auth/check-email', {email});
        if(emailResponse.data.error === 1) {
            return true; // email da dang ky
        } 
        return false; //email chua dang ky
        } catch (error) {
        console.error('Error checking email:', error);
        return false;
        }
    };

    defineRule('emailExist', async (value: string | undefined): Promise<boolean | string> => {
        if (!value) return 'Email is required';
        const exists = await checkEmailExist(value);
        if (exists) {
        return 'Email address already exists';
        }
        return true;
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