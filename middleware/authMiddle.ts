export default defineNuxtRouteMiddleware(async (to) => {

    const authStore = useAuthStore();

    const accessToken = useCookie('tokenAccess').value;
    const refreshToken = useCookie('tokenRefresh').value;

    // Không có token nào → chưa login
    if (!accessToken && !refreshToken) {
        authStore.authenticated = false;

        if (to.path !== '/') {
            return navigateTo('/');
        }

        return;
    }

     // Có access token → OK
    if (accessToken) {
        authStore.authenticated = true;
        return;
    }

    // Không có access token nhưng có refresh token → refresh
    if (!accessToken && refreshToken) {
        try {
            await authStore.refreshAccessToken();
            authStore.authenticated = true;
            return;
        } catch (err) {
            authStore.logOut();
            return navigateTo('/');
        }
    }

    if (authStore.authenticated && !authStore.userInfo) {
        await authStore.getInfoUser();
    }
});