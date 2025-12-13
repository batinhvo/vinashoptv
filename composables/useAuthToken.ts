export const useAuthToken = () => {
    // if (import.meta.server) {
    //     const reqCookies = useRequestHeaders(['cookie'])?.cookie || "";
    //     return reqCookies
    //         .split('; ')
    //         .find(c => c.startsWith('tokenAccess='))
    //         ?.split('=')[1] || "";
    // }

    // if (import.meta.browser) {
    //     return useCookie('tokenAccess').value || "";
    // }

    // return "";

    const token = useCookie<string>('tokenAccess');
    return token.value ? decodeURIComponent(token.value) : '';
};