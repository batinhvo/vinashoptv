export function useLocationSelect(formData: any, keyPath: string) {
    const stateStore = useStateStore();

    const stateOpt = computed(() => stateStore.states.map(s => s.name));

    const cityOpt = computed(() => {
        const stateCode = formData.value[keyPath].state
        return stateCode
        ? (stateStore.cities[stateCode] || []).map(c => c.name)
        : []
    })

    const newStateSelect   = ref('');
    const newCitySelect   = ref('');
    const statePlaceholder = ref('Select State');
    const cityPlaceholder  = ref('Select City');

    const stateOnSelected = async (value: string) => {
        const code = stateStore.states.find(s => s.name === value)?.code;
        if (!code) return;

        if (formData.value[keyPath].state === code) return;

        formData.value[keyPath].state = code;
        formData.value[keyPath].city  = '';

        newCitySelect.value = '';
        cityPlaceholder.value = '';

        await stateStore.fetchCities(code);
    }

    const cityOnSelected = (value: string) => {
        const stateCode = formData.value[keyPath].state;
        const cities = stateStore.cities[stateCode] || [];

        formData.value[keyPath].city = String(cities.find(c => c.name === value)?.id || 0);
    }


    const setStateAndCity = async (stateCode: string, cityId: number) => {
        if (!stateCode) return

        if (!stateStore.states.length) {
            await stateStore.fetchStates()
        }

        const cityList = await stateStore.fetchCities(stateCode);

        formData.value[keyPath].state = stateCode;
        formData.value[keyPath].city  = String(cityId);

        const stateName = stateStore.states.find(s => s.code === stateCode)?.name || 'Select State';
        const cityName = cityList.find(c => c.id === cityId)?.name || 'Select City';

        statePlaceholder.value = stateName;
        cityPlaceholder.value  = cityName;

        newStateSelect.value = stateName;
        newCitySelect.value  = cityName;
    };
    
    return {
        stateOpt,
        cityOpt,
        statePlaceholder,
        cityPlaceholder,
        newStateSelect,
        newCitySelect,
        stateOnSelected,
        cityOnSelected,
        setStateAndCity,
    }

}