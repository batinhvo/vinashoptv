<template>
    <div :class="['w-full mb-6 xl:px-4', widthfull ? '' : 'xl:w-1/2']">
        <div class="flex items-center">
            <Field class="accent-[#169100]" type="checkbox" v-bind="$attrs" @change="onChange" :checked="internalValue"
                :value="true" unchecked-value="false" :name="name" :rules="rules" />
            <slot>
                <label :for="name" class="font-bold ml-3 block">
                    <span v-if="isStrong" class="text-red-500">*</span>
                    {{ label }}
                </label>
            </slot>
        </div>
        <ErrorMessage :name="name" class="text-red-500 mt-2 text-xs pl-8" />
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    name: { type: String, required: true },
    label: { type: String },
    widthfull: { type: Boolean, default: false },
    rules: { type: String, default: '' },
    modelValue: { type: Boolean, default: false },
    isStrong: { type: Boolean, default: true }
});

const emit = defineEmits(['update:modelValue']);
const { setValue } = useField(props.name, props.rules);

const internalValue = ref(props.modelValue);
watch(() => props.modelValue, v => (internalValue.value = v));

function onChange(e: Event) {
    const checked = (e.target as HTMLInputElement).checked
    internalValue.value = checked
    emit('update:modelValue', checked) // 🔑 truyền ra cha
    setValue(checked)                  // đồng bộ VeeValidate
}
</script>
