import { defineStore } from "pinia";

export const useApiStore = defineStore('api', () => {
    const { get, post } = useApi();

    const fetchStates = async () => await get('https://vinashoptv.com/api/v1/states');

    return {fetchStates};
})