export function useLocationSelect(formData: any, keyPath: string) {
    const stateStore = useStateStore();

    const stateOpt = computed(() => stateStore.states.map(s => s.name));
    const cities = ref<{ id: number; name: string }[]>([]);

    const cityOpt  = computed(() => cities.value.map(c => c.name));

    const newStateSelect   = ref('');
    const statePlaceholder = ref('Select State');
    const cityPlaceholder  = ref('Select City');

    const stateOnSelected = async (value: string) => {
        const code = stateStore.states.find(s => s.name === value)?.code || '';
        formData.value[keyPath].state = code;
        cityPlaceholder.value = 'Select City';

        cities.value = code ? (await stateStore.fetchCities(code)) ?? [] : [];
    };

    const cityOnSelected = (value: string) => {
        formData.value[keyPath].city =
        String(cities.value.find(c => c.name === value)?.id || 0);
    };


    const setStateAndCity = async (stateCode: string, cityId: number) => {
        if (stateCode) cities.value = (await stateStore.fetchCities(stateCode)) ?? [];
        formData.value[keyPath].state = stateCode;
        formData.value[keyPath].city  = String(cityId);

        statePlaceholder.value = stateStore.states.find(s => s.code === stateCode)?.name || 'Select State';
        cityPlaceholder.value = cities.value.find(c => c.id === cityId)?.name || 'Select City';
    };
    
    return {
        stateOpt,
        cityOpt,
        statePlaceholder,
        cityPlaceholder,
        stateOnSelected,
        cityOnSelected,
        setStateAndCity,
        newStateSelect
    }

}