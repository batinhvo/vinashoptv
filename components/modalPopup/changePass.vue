<template>
    <form @submit.prevent="onSubmit">
        <div class="flex flex-wrap mt-6 w-96 bg-zinc-100 border border-zinc-200 py-3"> 
            <InputFiled v-model="password" :rules="'required|min:8'" name="password" label="Current Password" type="password" placeholder="********"/>   
            <InputFiled v-model="newPassword" :rules="'required|min:8'" name="newPassword" label="New Password" type="password" placeholder="********"/>   
            <InputFiled v-model="ConfPassword" :rules="'required|confirmed:newPassword'" name="ConfPassword" label="Confirm Password" type="password" placeholder="********"/>  
            <input type="checkbox" v-modal="show">
            <div v-if="isshow">
                <InputFiled v-model="email" :rules="'required|emailExist'" name="email" type="email" />
            </div>
        </div>    
    </form>
</template>

<script setup lang="ts">
    const show = ref(false);

    
    const emit = defineEmits();

    const { handleSubmit } = useForm();

    const onSubmit = handleSubmit(() => {
        emit('submitEvent');
    });
</script>