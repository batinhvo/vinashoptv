<template>
    <form @submit.prevent="onSubmit">
        <div class="flex flex-wrap mt-6 w-96 bg-zinc-100 border border-zinc-200 py-3"> 
            <InputField v-model="formData.password" rules="required|minLength:8" name="password" label="Current Password" type="password" :widthfull="true" :isStrong="false" placeholder="********"/>
            <InputField v-model="formData.newPassword" rules="required|minLength:8" name="newPassword" label="New Password" type="password" :widthfull="true" :isStrong="false" placeholder="********"/>   
            <InputField v-model="formData.confPassword" rules="required|confirmed:@newPassword" name="ConfPassword" label="Confirm Password" :widthfull="true" :isStrong="false" type="password" placeholder="********"/>             
        </div>    
    </form>
</template>

<script setup lang="ts">

    const formData = ref({
        password: '',
        newPassword: '',
        confPassword: '',
    });

    const { handleSubmit } = useForm();
    const onSubmit = handleSubmit(() => {
        alert(123)
    });

    defineExpose({submitForm:onSubmit});

</script>