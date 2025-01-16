interface State {
    code: string;
    name: string;
}

interface City {
    id: bigint;
    name: string;
}

export const useStateStore = defineStore('states', () => {

    // Dữ liệu state
    const states = ref<State[]>([]);  
    const cities = ref<City[]>([]);

    const error = ref<number>(0); // Lưu trạng thái lỗi, 0 là không có lỗi.
    const message = ref<string>(''); 
    
    const fetchStates =  async () => {
        try {
            const data = await $fetch<{ error: number; data: State[]; message: string }>('https://vinashoptv.com/api/v1/states');
            if (data) {
                states.value = data.data || [];
                message.value = data.message || 'Không có thông báo';
            }
        } catch (err) {
            error.value = 1;
            message.value = 'Lỗi khi tải dữ liệu state.';
        }
    };

    const fetchCities = async (stateCode: string) => {
        try {
            cities.value = [];
            const data = await $fetch<{ error: number; data: City[]; message: string }>(`https://vinashoptv.com/api/v1/cities?state=${stateCode}`);
            if (data.data) {
                cities.value = data.data || [];
                message.value = data.message || 'Không có thông báo';
                return cities;
            }
        } catch (err) {
            error.value = 1;
            message.value = 'Lỗi khi tải dữ liệu city.';
        }
    };

    const resetCities = () => {
        cities.value = [];
    };
    
    return { states, cities, error, message, fetchStates, fetchCities, resetCities };
});


// Lỗi: Component is already mounted, please use $fetch instead.
// Lỗi này xuất hiện vì trong Nuxt 3, useFetch được khuyến khích dùng trong lifecycle hooks trước khi component được mount 
// (ví dụ như setup hoặc onBeforeMount). Khi component đã được mount rồi, bạn cần dùng $fetch thay cho useFetch.