import type { DataUser, InputDataLogin, UserInfo } from "types/userTypes";

export const useAuthStore = defineStore('auth', {

    state: () => ({
        authenticated: false,
        user: null as string | null,
        userInfo: null as UserInfo | null,
    }),

    actions: {
        async authenticateUser({email, password}: InputDataLogin) {
            try {
                const apiUrl = useRuntimeConfig().public.apiBaseUrl;
                const userResponse = await $fetch<{ error: number; data: DataUser; message: string }>(`${apiUrl}auth/login`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: {
                        email, password,
                    }
                });

                if (userResponse.data) {
                    const tokenAccess = useCookie('token');
                    tokenAccess.value = userResponse.data.accessToken;
                    
                    localStorage.setItem('user', JSON.stringify(userResponse.data.name));
                    
                    this.user = userResponse.data.name;
                    this.authenticated = true;
                }
            } catch (e: any) {
                console.error("Login failed: ", e);
            }; 
        },

        logOut() {
            const tokenAccess = useCookie('token'); // useCookie new hook in nuxt 3
            tokenAccess.value = null; // clear the token cookie
            localStorage.removeItem('user');

            this.authenticated = false; // set authenticated  state value to false
            this.user = null;
        },

        restoreUser() {
            const token = useCookie('token');
            const userData = localStorage.getItem('user');

            if (token && userData) {
                try {
                    this.user = JSON.parse(userData);
                    this.authenticated = true;
                } catch (error) {
                    console.error('Error parsing user data:', error);
                    this.authenticated = false;
                    this.user = null;
                }
            } else {
                this.authenticated = false;
                this.user = null;
            }
        },

        async getInfoUser() {
            try {
                const apiUrl = useRuntimeConfig().public.apiBaseUrl;
                const token = useCookie('token').value;

                const infoUserResponse = await $fetch<{error: number; data: UserInfo; message: string }>(`${apiUrl}user/info`, {
                    method: 'GET',
                    headers: {
                        "Content-Type" : "application/json",
                        "Authorization" : `Bearer ${token || ""}`,
                    },
                });

                if (infoUserResponse.data) {
                    this.userInfo = infoUserResponse.data;
                }
            } catch (e: any) {
                console.error('Error get info user: ', e)
            }
        }
    },
});