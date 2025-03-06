export default defineNuxtRouteMiddleware(async (to, from) => {

    const notify = useNotify();
    const authStore = useAuthStore();

    let userData = null;
    if (import.meta.client) {
        userData = localStorage.getItem('user');
    }

    if (!userData) {
        authStore.authenticated = false;

        notify({
            message: 'Please login to continue!',
            type: 'error',
            time: 3000,
        });

        return navigateTo('/');
    }
});