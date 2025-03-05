export default defineNuxtRouteMiddleware(async (to, from) => {

    const authStore = useAuthStore();

    const tokenAccess = useCookie('tokenAccess', { sameSite: 'strict' });
    const tokenRefresh = useCookie('tokenRefresh', { sameSite: 'strict' });

    let userData = null;
    if (import.meta.client) {
        userData = localStorage.getItem('user');
    }

    if (!userData) {
        authStore.authenticated = false;
        return;
    }

    if (authStore.refreshing && tokenRefresh.value) {
        try {
            const dataToken = await authStore.refreshAccessToken(tokenRefresh.value);

            if (dataToken) {
                tokenAccess.value = dataToken.newAccessToken;
                tokenRefresh.value = dataToken.newRefreshToken;
                authStore.authenticated = true;
                authStore.refreshing = false;
                return;
            }

        } catch (error) {
            authStore.refreshing = false;
            console.error('[Auth Middleware] Error refreshing token:', error);          
        } 
    }

    console.log(authStore.refreshing)
});