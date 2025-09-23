interface State {
    code: string;
    name: string;
}

interface City {
    id: number;
    name: string;
}

export const useStateStore = defineStore('states', () => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiBaseUrl;

    // Dữ liệu state
    const states = ref<State[]>([]);  
    const cities = ref<City[]>([]);

    const error = ref<number>(0); // Lưu trạng thái lỗi, 0 là không có lỗi.
    const message = ref<string>(''); 
    
    const fetchStates =  async () => {
        try {
            const data = await $fetch<{ error: number; data: State[]; message: string }>(`${apiUrl}states`);
            if (data) {
                states.value = data.data || [];
                message.value = data.message || 'Không có thông báo';
            }
        } catch (err) {
            error.value = 1;
            message.value = 'Lỗi khi tải dữ liệu state.';
        }
    };

    const fetchCities = async (stateCode: string): Promise<{id:number; name:string}[]> => {
        try {
            cities.value = [];
            const data = await $fetch<{ error: number; data: City[]; message: string }>(`${apiUrl}cities?state=${stateCode}`);
            if (data.data) {
                cities.value = data.data || [];
                message.value = data.message || 'Không có thông báo';
                return cities.value;
            }
            return [];
        } catch (err) {
            error.value = 1;
            message.value = 'Lỗi khi tải dữ liệu city.';
            return [];
        }
    };

    const resetCities = () => {
        cities.value = [];
    };
    
    return { states, cities, fetchStates, fetchCities, resetCities };
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