interface State {
    code: string;
    name: string;
}

interface City {
    id: number;
    name: string;
}

interface ApiResponse<T> {
  error: number
  data: T
  message: string
}

export const useStateStore = defineStore('states', () => {
    const apiUrl = useApi();

    // state
    const states = ref<State[]>([])
    //const cities = ref<City[]>([])
    const cities = ref<Record<string, City[]>>({})
    const error = ref(0)
    const message = ref('')
    
    // helper fetch chung
    const fetchApi = async <T>(url: string): Promise<T> => {
        try {
            const res = await $fetch<ApiResponse<T>>(`${apiUrl}${url}`)
            message.value = res.message || ''
            error.value = res.error || 0
            return res.data
        } catch {
            error.value = 1
            throw new Error('Fetch failed')
        }
    }

    const fetchStates = async () => {
        if (states.value.length) return;

        try {
            states.value = await fetchApi<State[]>('states')
        } catch {
            message.value = 'Error loading state location data'
            states.value = []
        }
    }

    const fetchCities = async (stateCode: string) => {
        if (!stateCode) return [];

        if (cities.value[stateCode]) {
            return cities.value[stateCode]
        }

        try {
            const data = await fetchApi<City[]>(`cities?state=${stateCode}`)
            cities.value[stateCode] = data
            return data
        } catch {
            message.value = 'Error loading city location data'
            //cities.value = []
            return []
        }
    }

    const resetCities = (stateCode?: string) => {
        if (stateCode) {
            delete cities.value[stateCode]
        } else {
            cities.value = {}
        }
    }
    
    return {
        states,
        cities,
        error,
        message,
        fetchStates,
        fetchCities,
        resetCities,
    }
});


// Lỗi: Component is already mounted, please use $fetch instead.
// Lỗi này xuất hiện vì trong Nuxt 3, useFetch được khuyến khích dùng trong lifecycle hooks trước khi component được mount 
// (ví dụ như setup hoặc onBeforeMount). Khi component đã được mount rồi, bạn cần dùng $fetch thay cho useFetch.


/*

Nguyên nhân gây ra lỗi Hydration Mismatch
Dữ liệu không nhất quán giữa SSR và client:

Nếu dữ liệu sử dụng để render giao diện thay đổi giữa quá trình render trên server và quá trình render trên client (ví dụ: sử dụng dữ liệu lấy từ API mà không đồng bộ, hoặc tính toán có sự thay đổi như new Date(), Math.random(),…).
Sử dụng các API chỉ có trên client:

Các đối tượng như window, document hay các tính năng chỉ có trên trình duyệt nếu được sử dụng trong quá trình render phía server sẽ gây ra sự khác biệt.
Thành phần (component) không đồng nhất:

Các component có logic render phụ thuộc vào môi trường (server/client) hoặc có sự thay đổi trạng thái không được đồng bộ giữa server và client.
Thay đổi DOM không được kiểm soát:

Nếu có các thay đổi DOM xảy ra ngay sau khi render SSR (ví dụ: thông qua các hiệu ứng hay plugin bên ngoài) thì có thể gây ra sự không khớp khi Vue cố gắng “hydrate” DOM đó.
*/