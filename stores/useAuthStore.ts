export const useAuthStore = () => {
    interface DataUser {
        accessToken: string,
        name: string,
        refreshToken: string,
    }

    // Hàm gọi API để xác thực accessToken
    // const config = useRuntimeConfig();
    // const apiUrl = config.public.apiBaseUrl;
    // const verifyToken = async (token: string): Promise<boolean> => {
    //     try {
    //         const response = await fetch(`${apiUrl}auth/login`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });
    //         const data = await response.json();
    //         return data.valid; // Giả sử API trả về { valid: true } nếu token hợp lệ
    //     } catch (error) {
    //         return false;
    //     }
    // };

    // Kiểm tra nếu đang chạy trên client
    const getUserFromLocalStorage = () => {
        if (process.client) {
            const storedUser = localStorage.getItem('user');
            return storedUser ? JSON.parse(storedUser) : null;
        }
        return null;
    };

    const user = useState<DataUser | null>('user', () => getUserFromLocalStorage());

    // Cập nhật localStorage khi user thay đổi
    watch(user, (newUser) => {
        if (process.client) {
            if (newUser) {
                localStorage.setItem('user', JSON.stringify(newUser));
            } else {
                localStorage.removeItem('user');
            }
        }
    });

    // Hàm đăng nhập (set user)
    const setUser = (newUser: DataUser | null) => {
        user.value = newUser;
    };

    // Hàm đăng xuất
    const logout = () => {
        user.value = null;
    };

    // Kiểm tra xem user đã đăng nhập chưa
    const isAuthenticated = computed(() => !!user.value);

    return {
        user,
        setUser,
        logout,
        isAuthenticated,
    };
};