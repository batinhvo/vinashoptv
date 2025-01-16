export const useAuth = () => {
    const user = ref<{ email: string } | null>(null);

    // Load user từ localStorage
    const loadUser = () => {
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                user.value = JSON.parse(storedUser);
            }
        }
    };

    // Đăng xuất và xóa thông tin người dùng
    const logout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('user');
        }
        user.value = null;
    };

    onMounted(() => {
        loadUser();
    });
    
    return {
        user: computed(() => user.value),
        loadUser,
        logout,
    };
};