<template>
    <div :class="['relative w-full mb-6 xl:px-2', widthfull ? '' : 'xl:w-1/2']">
        <label :for="name" class="font-bold ml-3 block mb-2.5">{{ label }} <span v-if="isStrong" class="text-red-500">*</span></label>
        <!-- VeeValidate Form -->
        <Field
            :name="name"
            :rules="rules"
            v-model="selectedValue"
            v-slot="{ field }"
        >
            <!-- Dropdown Button -->
            <button type="button" @click="toggleDropdown"
            class="w-full bg-white border border-gray-300 rounded-full px-4 py-3 text-left shadow-sm focus:outline-none"
            :class="[!meta.valid && meta.touched ? 'border-red-500' : 'border-gray-300']">
                {{ selectedValue || placeholder }}
                <span class="float-right">
                    <i class="fa fa-angle-down text-[9px] text-neutral-500 pl-1.5"></i>
                </span>
            </button>
    
            <!-- Dropdown Menu -->
            <ul v-if="isOpen" class="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                <li
                    v-for="(option, index) in options"
                    :key="index"
                    @click="selectOption(option, field)"
                    class="cursor-pointer px-4 py-2 hover:bg-gray-100"
                >
                    {{ option }}
                </li>
            </ul>
            <!-- Error Message -->
            <ErrorMessage :name="name" class="text-red-500 mt-2 text-xs pl-4"/>
        </Field>
    </div>
</template>
  
<script lang="ts" setup>
    // Props
    const props = defineProps({
        label: { type: String, default: '' },
        name: { type: String, required: true },
        widthfull: { type: Boolean, default: false },
        options: { type: Array as () => string[], required: true },
        placeholder: { type: String, default: 'Select an option' },
        rules: { type: String, default: '' },
        isStrong: { type: Boolean, default: true},
    });
    
    // Emit for parent
    const emit = defineEmits(['update:modelValue', 'selected'])
    
    // States
    const isOpen = ref(false)
    const selectedValue = ref<string | null>(null)
    
    // Methods
    const toggleDropdown = () => {
        isOpen.value = !isOpen.value
    }
    
    const selectOption = (option: string, field: any) => {
        selectedValue.value = option
        field.value = option // Đồng bộ VeeValidate
        isOpen.value = false
        // Emit value back to parent
        emit('update:modelValue', option)
        emit('selected', option)
    }

    const { value: fieldValue, meta } = useField(props.name, props.rules);
    const modelValue = defineModel();
    watch(modelValue, () => {
        meta.valid = fieldValue.value ? true : false; // This is just an example logic. 
    })
</script>