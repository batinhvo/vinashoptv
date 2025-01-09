<template>
    <form @submit.prevent="submitForm">
        <div class="flex flex-wrap mt-6 w-96 bg-zinc-100 border border-zinc-200 py-3"> 
            <div v-for="(field, index) in fields" :key="index" class="w-full">
                <InputFiled 
                    v-bind="fieldProps(field)"
                    v-slot="{ field, errorMessage }"
                >
                    <span>{{ errorMessage }}</span>
                </InputFiled>       
            </div>             
        </div>
        <button type="submit">Submit</button>
    </form>
</template>

<script setup lang="ts">
import { useForm, useField } from 'vee-validate';
import * as rules from '@vee-validate/rules';

    // Khai báo kiểu cho các trường
    interface Field {
        name: string;
        label: string;
        validation: string;
    }

    const fields: Field[] = [
        { name: 'password', label: 'Current Password', validation: 'required' },
        { name: 'newPassword', label: 'New Password', validation: 'required|min:8' },
        { name: 'confirmPassword', label: 'Confirm Password', validation: 'required|confirmed:newPassword' },
    ];

    const { handleSubmit } = useForm();

    const fieldProps = (field: Field) => {
        const { value, errorMessage } = useField(field.name, field.validation);
        return {
            label: field.label,
            placeholder: '********',
            type: 'password',
            errorMessage: errorMessage,
            field: value,
        };
    };

    const submitForm = handleSubmit((values) => {
        console.log('Dữ liệu form đã được gửi:', values);
    });

</script>