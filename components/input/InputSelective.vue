<template>
    <div :class="['relative w-full mb-6 xl:px-2', widthfull ? '' : 'xl:w-1/2']">
        <label :for="name" class="font-bold ml-3 block mb-2.5">
            {{ label }} <span v-if="isStrong" class="text-red-500">*</span>
        </label>

        <Field :name="name" :rules="rules" v-model="selectedValue" v-slot="{ field, meta }">
            <!-- Nút dropdown -->
            <button
                type="button"
                @click="toggleDropdown"
                v-bind="field"
                :value="field.value"
                class="w-full bg-white border border-gray-300 rounded-full px-4 py-3 text-left shadow-sm focus:outline-none"
                :class="[!meta.valid && meta.touched ? 'border-red-500' : 'border-gray-300']"
            >
                {{ field.value || placeholder }}
                <span class="float-right">
                <i class="fa fa-angle-down text-[9px] text-neutral-500 pl-1.5"></i>
                </span>
            </button>

            <!-- Menu dropdown -->
            <div
                v-if="isOpen"
                class="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
            >
                <!-- Ô tìm kiếm -->
                <div v-if="isSearch" class="p-2 border-b border-gray-200">
                    <input
                        type="text"
                        v-model="searchQuery"
                        placeholder="Type to search..."
                        class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                    />
                </div>

                <ul>
                    <li
                        v-for="(option, index) in filteredOptions"
                        :key="index"
                        @click="selectOption(option, field)"
                        class="cursor-pointer px-4 py-2 hover:bg-gray-100"
                    >
                        {{ option }}
                    </li>
                    <li v-if="filteredOptions.length === 0" class="px-4 py-2 text-gray-400 text-sm">
                        No results found
                    </li>
                </ul>
            </div>

            <ErrorMessage :name="name" class="text-red-500 mt-2 text-xs pl-4" />
        </Field>
    </div>
</template>
  
<script lang="ts" setup>
    import { Field } from 'vee-validate';

    // Props
    const props = defineProps({
        label: { type: String, default: '' },
        name: { type: String, required: true },
        widthfull: { type: Boolean, default: false },
        options: { type: [Array, Object] as PropType<string[] | Ref<string[]>>, required: true },
        placeholder: { type: String, default: 'Select an option' },
        rules: { type: String, default: '' },
        isStrong: { type: Boolean, default: true},
        isSearch: { type: Boolean, default: false},
    });
    
    // Emit for parent
    const emit = defineEmits(['update:modelValue', 'selected'])
    
    // States
    const isOpen = ref(false)
    const searchQuery = ref("");
    const selectedValue = ref<string | number | null>();
    
    // Methods
    const toggleDropdown = () => {
        isOpen.value = !isOpen.value
    }

    const selectOption = (option: string, field: any) => {
        modelValue.value = option;   // cập nhật v-model
        isOpen.value = false;
        fieldValue.value = option;
        field.value = option;

        emit("update:modelValue", option);
        emit("selected", option);
    };

    const { value: fieldValue, setValue } = useField(props.name, props.rules);
    const modelValue = defineModel<string | number | null>();

    // lọc danh sách theo input
    const filteredOptions = computed(() => {
        const list = unref(props.options);
        return list.filter((opt: string) =>
            opt.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    });

    watch(isOpen, (val) => {
        if (!val) {
            searchQuery.value = ''; // Xóa ô search khi dropdown đóng
        }
    });

    

    watch(
        () => modelValue.value,
        (val) => {
            if (val !== undefined && val !== null) {
            setValue(val);        // cập nhật cho Field
            selectedValue.value = val; 
            fieldValue.value = val;

            //console.log('InputSelective mounted', fieldValue.value);
            }
        },
        { immediate: true }

        
    );

    

    
</script>
