export default defineNuxtRouteMiddleware(async (to, from) => {

    const authStore = useAuthStore();

    let userData = null;
    if (import.meta.client) {
        userData = localStorage.getItem('user');
    }

    if (!userData) {
        authStore.authenticated = false;
        return navigateTo('/');
    }
});