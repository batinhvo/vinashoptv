<template>
    <form @submit.prevent="onSubmit">
        <div class="flex flex-wrap mt-6 w-96 bg-zinc-100 border border-zinc-200 py-3"> 
            <InputField v-model="password" rules="required|minLength:8" name="password" label="Current Password" type="password" :isStrong=false placeholder="********"/>
            <InputField v-model="newPassword" rules="required|minLength:8" name="newPassword" label="New Password" type="password" :isStrong=false placeholder="********"/>   
            <InputField v-model="confPassword" rules="required|confirmed:@newPassword" name="ConfPassword" label="Confirm Password" :isStrong=false type="password" placeholder="********"/>             
        </div>    
    </form>
</template>

<script setup lang="ts">
    const emit = defineEmits();
    const { handleSubmit } = useForm();
    const onSubmit = handleSubmit(() => {
        emit('submitEvent');
        alert(123)
    });

    const password = ref('');
    const newPassword = ref('');
    const confPassword = ref('');

    // const mockApiRequest = (value: string | undefined) => {
    //     return new Promise((resolve) => {
    //         setTimeout(() => {
    //         resolve(value === 'test@example.com');
    //         }, 1000);
    //     });
    // };

    // defineRule('emailExist', async (value: string | undefined) : Promise<boolean|string> => {
    //     const result = await mockApiRequest(value);
    //     if(result) {
    //         return 'Email address already exists';
    //     }
    //     return true;
    // });

</script>