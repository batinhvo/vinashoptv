<template>
    <div class="flex flex-wrap mt-6 max-w-[860px] bg-zinc-100 border border-zinc-200 py-3 px-1">
        <InputFiled id="firstName" label="Fist Name" value="Ba Tinh"/>
        <InputFiled id="LastName" label="Last Name" value="Vo"/>
        <InputFiled id="emailAddress" label="Email Address" type="email" value="info@gmail.com"/>
        <InputFiled id="phone" label="Phone Number" type="number" value="(000) 999-9999"/>
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
        <InputFiled id="postCode" label="Postcode/Zip" type="number" value="78012"/>
        <InputFiled id="street" label="Street Address" value="9999 Bellaire Blvd., Suite 1111"/>
    </div>
</template>

<script setup lang="ts">

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

    const { data:stateData, error:stateError } = await useAsyncData<State[]>(
        'states', () => $fetch("https://vinashoptv.com/api/v1/states")
    );

    if(stateData.value) {
        stateOpt.value = stateData.value.map(state => state.name);
    } else {
        console.log('Error fetching states:', stateError);
    }

    async function fetchCities(stateCode: string) {
        try {
            const { data: cityData, error: cityError } = await useAsyncData<City[]>(
                'cities', () => $fetch(`https://vinashoptv.com/api/v1/cities?state=${stateCode}`)
            );
            if (cityData.value) {
                cityOpt.value = cityData.value.map(city => city.name);
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
        const state = stateData.value?.find(state => state.name === newStateSelected);
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

</script>

<style lang="css" scoped>
    input[type="number"]::-webkit-inner-spin-button, 
    input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    input[type="number"] {
        -moz-appearance: textfield; /* Ẩn trên Firefox */
        appearance: none;
    }
</style>