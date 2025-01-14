<template>
    <form @submit.prevent="onSubmit">
        <div class="flex flex-wrap mt-6 max-w-[860px] bg-zinc-100 border border-zinc-200 py-3 px-1">
            <InputField v-model="firstName" rules="required" name="firstName" label="Fist Name" :widthfull=false :isStrong=false />
            <InputField v-model="lastName" rules="required" name="LastName" label="Last Name" :widthfull=false :isStrong=false />
            <InputField v-model="emailAddress" rules="required|email" name="emailAddress" label="Email Address" type="email" :widthfull=false :isStrong=false />
            <InputField v-model="phone" rules="required|phone" name="phone" label="Phone Number" :widthfull=false :isStrong=false />
            <InputSelect id="state" label="State"
                :options="stateOpt"
                :activeDropdownId="activeDropdownId"
                :defaultOption="stateSelected"
                @update:selectedOption="setState"
                @update:activeDropdownId="setActiveDropdownId"
            />      
            <InputSelect id="city" label="City"
                :options="cityOpt"
                :activeDropdownId="activeDropdownId"
                :defaultOption="citySelected"
                @update:selectedOption="setCity"
                @update:activeDropdownId="setActiveDropdownId"
            />     
            <InputField v-model="postCode" rules="required" name="postCode" label="Postcode/Zip" :widthfull=false :isStrong=false />
            <InputField v-model="street" rules="required" name="street" label="Street Address" :widthfull=false :isStrong=false />
        </div>
    </form>
</template>

<script setup lang="ts">

    const firstName = ref('');
    const lastName = ref('');
    const emailAddress = ref('');
    const phone = ref('');
    const postCode = ref('');
    const street = ref('');

    interface State {
        code: string;
        name: string;
    }

    interface City {
        id: bigint;
        name: string;
    }
    
    const stateOpt = ref<string[]>([]);
    const cityOpt = ref<string[]>([]);
    const stateSelected = ref<string>('Alabama');   
    const citySelected = ref<string>('');
  
    const { data:stateData, error:stateError } = await useAsyncData<{ error: number; data: State[]; message: string }>(
        'states', () => $fetch<{ error: number; data: State[]; message:string }>("https://vinashoptv.com/api/v1/states")
    );
    if(stateData.value) {
        stateOpt.value = stateData.value.data.map((state) => state.name);
    } else {
        console.log('Error fetching states:', stateError.value);
    }

    async function fetchCities(stateCode: string) {
        try {
            const { data: cityData, error: cityError } = await useAsyncData<{ error: number; data: City[]; message: string }>(
                'cities', () => $fetch<{ error: number; data: City[]; message: string }>(`https://vinashoptv.com/api/v1/cities?state=${stateCode}`)
            );
            if (cityData.value) {
                cityOpt.value = cityData.value.data.map((city) => city.name);
            } else {
                console.error('Error fetching cities:', cityError);
                cityOpt.value = [];
            }
        } catch (error) {
            console.error('Error fetching cities:', error);
            cityOpt.value = [];
        }
    }

    // Watch for state selection changes and fetch cities accordingly
    watch(stateSelected, (newStateSelected) => {
        const state = stateData.value?.data.find(state => state.name === newStateSelected);
        if (state) {
            fetchCities(state.code);
        } else {
            cityOpt.value = [];
        }
    });

    function setState(stateOption: string) {
        stateSelected.value = stateOption;
    }
    function setCity(cityOption: string) {
        citySelected.value = cityOption;
    }

    const activeDropdownId = ref('');
    function setActiveDropdownId(id: string) {
        activeDropdownId.value = id;
    }

    //submit
    const emit = defineEmits();
    const { handleSubmit } = useForm();
    const onSubmit = handleSubmit(() => {
        emit('submitEvent');
        alert(123)
    });

</script>
