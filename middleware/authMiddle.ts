export default defineNuxtRouteMiddleware((to) => {

    const notify = useNotify();
    const authStore = useAuthStore();
    const tokenAccess = useCookie('token');
    const userData = import.meta.client ? localStorage.getItem('user') : null;

    if (tokenAccess.value && userData) {
        authStore.authenticated = true;
    } else {
        authStore.authenticated = false;
    }

    // check if value exists
    if (tokenAccess.value) {
        authStore.authenticated = true; // update the state to authenticated
    }

    // if token doesn't exist redirect to log in
    if (!tokenAccess.value) {
        authStore.authenticated = false;
        notify({
            message: 'Please login',
            type: 'error',
            time: 2000,
        });
        authStore.logOut();
    }

});