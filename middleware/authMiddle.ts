export default defineNuxtRouteMiddleware((to) => {
    const authStore = useAuthStore();
    const tokenAccess = useCookie('token');
    const userData = import.meta.client ? localStorage.getItem('user') : null;

    if (tokenAccess.value && userData) {
        authStore.authenticated = true;
        //authStore.user = import.meta.client ? JSON.parse(userData) : null; // Gán lại user từ localStorage
    }

    // check if value exists
    if (tokenAccess.value) {
        authStore.authenticated = true; // update the state to authenticated
    }

    // if token doesn't exist redirect to log in
    if (!tokenAccess.value && to?.name !== 'login') {
        //abortNavigation();
        //return navigateTo('/login');
    }

});