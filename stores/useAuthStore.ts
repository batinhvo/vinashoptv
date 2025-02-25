export const useAuthStore = () => {
    interface DataUser {
        accessToken: string,
        name: string,
        refreshToken: string,
    }

    const user = useState<DataUser | null>('user', () => null);

    // Chỉ chạy trên client để tránh lỗi SSR
    onMounted(() => {
        if (process.client) {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                user.value = JSON.parse(storedUser);
            }
        }
    });

    // Cập nhật user vào localStorage khi có thay đổi
    watch(user, (newUser) => {
        if (process.client) {
            if (newUser) {
                localStorage.setItem('user', JSON.stringify(newUser));
            } else {
                localStorage.removeItem('user');
            }
        }
    }, { deep: true });

    // Hàm đăng nhập (set user)
    const setUser = (newUser: DataUser | null) => {
        user.value = newUser;
    };

    // Hàm đăng xuất
    const logout = () => {
        user.value = null;
    };

    return {
        user,
        setUser,
        logout,
    };
};