<template>
    <div :class="['w-full mb-6 xl:px-4', widthfull ? '' : 'xl:w-1/2']">
        <div class="flex flex-wrap items-center">
            <Field 
            class="accent-[#169100]"
            type="checkbox"           
            v-bind="$attrs"
            v-model="modelValue"
            :name
            :rules
            />
            <label :for="name" class="font-bold ml-3 block">
                <span v-if="isStrong" class="text-red-500">*</span> 
                {{ label }}
            </label>
        </div>
        <ErrorMessage :name="name" class="text-red-500 mt-2 text-xs pl-8"/>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        name: { type: String, required: true },
        label: { type: String, required: true },
        widthfull: { type: Boolean, default: false },
        rules: { type: String, default: '' },
        modelValue: { type: Boolean, default: false },
        isStrong: { type: Boolean, default: true }
    });

    const { setValue } = useField(props.name, props.rules);
    const modelValue = ref(props.modelValue);

    watch(modelValue, (newValue) => {
        setValue(newValue);
    });
</script>
