export default defineNuxtRouteMiddleware((to) => {

    const notify = useNotify();
    const authStore = useAuthStore();
    const tokenAccess = useCookie('tokenAccess');
    const tokenRefresh = useCookie('tokenRefresh');
    const userData = import.meta.client ? localStorage.getItem('user') : null;

    if(!userData) {
        authStore.authenticated = false;
        return;
    }

    const isTokenExpired = (token: string) => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1])); // Decode token
            return payload.exp * 1000 < Date.now();
        } catch (error) {
            return true; // Nếu lỗi xảy ra, xem như token không hợp lệ
        }
    };

    // Kiểm tra tokenAccess có hết hạn không
    if (tokenAccess.value && !isTokenExpired(tokenAccess.value)) {
        authStore.authenticated = true;
        return;
    }

    // Nếu accessToken hết hạn nhưng còn refreshToken => gửi request lấy token mới
    if (tokenRefresh.value && !isTokenExpired(tokenRefresh.value)) {
        try {
            const newAccessToken = authStore.refreshAccessToken();
            // if (newAccessToken) {
            //     // tokenAccess.value = newAccessToken; // Cập nhật token mới
            //     // authStore.authenticated = true;
            //     // return;
            // }
        } catch (error) {
            console.error('Failed to refresh token', error);
        }
    }

    // Nếu refreshToken cũng hết hạn, bắt buộc đăng nhập lại
    authStore.authenticated = false;
    notify({
        message: 'Your session has expired, please log in again!',
        type: 'error',
        time: 3000,
    });
    authStore.logOut();

});