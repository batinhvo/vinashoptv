<template>
    <div class="flex flex-wrap mt-6 w-96 bg-zinc-100 border border-zinc-200 py-3">
        <InputFiled id="password" label="Current Password" widthfull type="password" placeholder="********" 
            v-model="formData.password"
            @blur="validate('password', 'required|min:8')"/>

        <InputFiled id="newPassword" label="New Password" widthfull type="password" placeholder="********" v-model="formData.newPass"/>

        <InputFiled id="ConfirmPassword" label="Confirm Password" widthfull type="password" placeholder="********" v-model="formData.confPass"/>
    </div>
</template>

<script setup lang="ts">
    const { formData, errors, validate, submitForm} = useFormValidation;
</script>