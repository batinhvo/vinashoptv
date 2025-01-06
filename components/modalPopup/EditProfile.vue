<template>
    <div class="flex flex-wrap mt-6 max-w-[860px] bg-zinc-100 border border-zinc-200 p-3">
        <div class="w-full xl:w-1/2 mb-6 xl:pr-2">
            <label for="firstName" class="font-bold ml-2 block">First Name</label>
            <input type="text" value="Ba Tinh" id="firstName" name="firstName"
            class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm appearance-none focus:outline-none focus:border-blue-300 disabled:bg-zinc-50
            disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none">
        </div>
        <div class="w-full xl:w-1/2 mb-6 xl:pl-2">
            <label for="lastName" class="font-bold ml-2 block">Last Name</label>
            <input type="text" value="Vo" id="lastName" name="lastName"
            class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm appearance-none focus:outline-none focus:border-blue-300 disabled:bg-zinc-50
            disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none">
        </div>
        <div class="w-full xl:w-1/2 mb-6 xl:pr-2">
            <label for="email" class="font-bold ml-2 block">Email Address</label>
            <input type="email" value="info@gmail.com" id="email" name="email"
            class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm appearance-none focus:outline-none focus:border-blue-300 disabled:bg-zinc-50
            disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none">
        </div>
        <div class="w-full xl:w-1/2 mb-6 xl:pl-2">
            <label for="phone" class="font-bold ml-2 block">Phone Number</label>
            <input type="number" value="09123654789" id="phone" name="phone"
            class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm appearance-none focus:outline-none focus:border-blue-300 disabled:bg-zinc-50
            disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none">
        </div>
        <div class="w-full xl:w-1/2 mb-6 xl:pl-2">
            <label class="font-bold ml-2 block">State</label>
            <BodyCheckoutInputSelect                                          
            id="state"
            :options="stateOpt"
            :activeDropdownId="activeDropdownId"
            :defaultOption="stateSelected"
            @update:selectedOption="setState"
            @update:activeDropdownId="setActiveDropdownId"
            />                      
        </div>     
        <div class="w-full xl:w-1/2 mb-6 xl:pl-2">
            <label class="font-bold ml-2 block">City</label>
            <BodyCheckoutInputSelect                                          
            id="city"
            :options="cityOpt"
            :activeDropdownId="activeDropdownId"
            :defaultOption="citySelected"
            @update:selectedOption="setCity"
            @update:activeDropdownId="setActiveDropdownId"
            />                      
        </div>
        <div class="w-full xl:w-1/2 mb-6 xl:pl-2">
            <label for="postCode" class="font-bold ml-2 block">Postcode/Zip</label>
            <input type="number" value="78012" id="postCode" name="postCode"
            class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm appearance-none focus:outline-none focus:border-blue-300 disabled:bg-zinc-50
            disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none">
        </div>
        <div class="w-full xl:w-1/2 mb-6 xl:pl-2">
            <label for="stressAddress" class="font-bold ml-2 block">Street Address</label>
            <input type="text" id="stressAddress" name="stressAddress" value="9999 Bellaire Blvd., Suite 1111, Houston, TX 77036"
            class="mt-2.5 py-3 px-5 border rounded-full w-full shadow-sm appearance-none focus:outline-none focus:border-blue-300 disabled:bg-zinc-50
            disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none">
        </div>
    </div>
</template>

<script setup lang="ts">

    interface State {
        code: string;
        name: string;
    }

    interface City {
        id: BigInteger;
        name: string;
    }
    
    const stateOpt = ref<string[]>([]);
    const selectedState = ref<string | null>(null);
    const cityOpt = ref<string[]>([]);

    const { data:stateData, error:stateError } = await useAsyncData<State[]>(
        'states', () => $fetch("https://vinashoptv.com/api/v1/states")
    );

    const {data:cityData, error:cityError, refresh: refreshCities} = await useAsyncData<City[]>(
        'cities', () => selectedState.value ? $fetch(`https://vinashoptv.com/api/v1/cities?state=${selectedState.value}`),
        {immediate: false}
    );

    if(stateData.value) {
        stateOpt.value = stateData.value.map(state => state.name);
    } else {
        console.log(stateError);
    }

    if(cityData.value) {
        cityOpt.value = cityData.value.map(ci => ci.name);
        console.log(cityData.value)
    } else {
        console.log(cityError);
    }

    const stateSelected = ref('Houston');
    const citySelected = ref('Houston');

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