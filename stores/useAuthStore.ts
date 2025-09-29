import type { DataProfileUser, DataRefresh, DataUser, InfoSubscribe, InputDataLogin, PassUser, UserInfo } from "types/userTypes";
const notify = useNotify();

export const useAuthStore = defineStore('auth', {
    
    state: () => ({
        authenticated: false,
        user: null as string | null,
        userInfo: null as UserInfo | null,
        infoSubscribe: null as InfoSubscribe | null,
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

                if (userResponse.error) return Promise.reject(userResponse.message);

                if (userResponse.data) {
                    const tokenAccess = useCookie('tokenAccess');
                    const tokenRefresh = useCookie('tokenRefresh');

                    tokenAccess.value = userResponse.data.accessToken;
                    tokenRefresh.value = userResponse.data.refreshToken;
                    
                    localStorage.setItem('user', JSON.stringify(userResponse.data.name));
                    
                    this.user = userResponse.data.name;
                    this.authenticated = true;

                }
            } catch (e: any) {
                console.error("Login failed: ", e);
                return Promise.reject(e?.response._data?.message || 'Something went wrong')
            }; 
        },

        logOut() {
            useCookie('tokenAccess').value = null;
            useCookie('tokenRefresh').value = null; 
            
            localStorage.removeItem('user');

            this.authenticated = false; 
            this.user = null;

            navigateTo('/');
        },

        restoreUser() {
            const token = useCookie('tokenAccess');
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
            if (!this.authenticated || !useCookie('tokenAccess').value) return;

            try {
                const apiUrl = useRuntimeConfig().public.apiBaseUrl;
                const token = useCookie('tokenAccess').value;

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

                if(e?.response?.status === 401) {
                    await this.refreshAccessToken();
                }

            }
        },

        async refreshAccessToken() {
            const apiUrl = useRuntimeConfig().public.apiBaseUrl;         
            const tokenRefresh = useCookie('tokenRefresh');
            
            try {

                const data  = await $fetch<{error: number; data: DataRefresh; message: string;}>(`${apiUrl}auth/refresh-token`, {
                    method: 'POST',
                    headers: {
                        "Content-Type" : "application/json",
                    },
                    body: JSON.stringify({ refreshToken: tokenRefresh.value })
                });
    
                if (data.error) throw new Error(data.message);

                useCookie('tokenAccess').value = data.data.accessToken;
                useCookie('tokenRefresh').value = data.data.refreshToken;
                this.authenticated = true;
                    
            } catch (e :any) {
                console.error("Token refresh failed:", e);
                if (e?.response?.status === 500 || e?.response?.status === 400) {
                    this.authenticated = false;
                    notify({
                        message: 'Your session has expired, please log in again!',
                        type: 'error',
                        time: 3000,
                    });
                    this.logOut();                   
                }
            }
        },

        async updateProfileUser({address, cityId, country, firstName, lastName, phone, state, zip}: DataProfileUser) {
            try {
                const apiUrl = useRuntimeConfig().public.apiBaseUrl;
                const token = useCookie('tokenAccess').value;

                if (!token) throw new Error("No token available");

                await $fetch<{error: number; message: string}>(`${apiUrl}auth`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type" : "application/json",
                        "Authorization" : `Bearer ${token || ""}`,
                    },
                    body: { address, cityId, country, firstName, lastName, phone, state, zip },
                });
                
            } catch (e: any) {
                console.error('Error update profile user: ', e);
                return Promise.reject(e?.response._data?.message || 'Something went wrong')
            }
        },

        async updatePasswordUser({currentPassword, newPassword}: PassUser) {
            try {
                const apiUrl = useRuntimeConfig().public.apiBaseUrl;
                const token = useCookie('tokenAccess').value;

                if (!token) throw new Error("No token available");

                const changePassResponse = await $fetch<{error: number; message: string}>(`${apiUrl}auth/change-password`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type" : "application/json",
                        "Authorization" : `Bearer ${token || ""}`,
                    },
                    body: { currentPassword, newPassword },
                });
  
                if (changePassResponse.error) throw new Error(changePassResponse.message);
            } catch (e: any) {
                console.error('Error updating password: ', e);
            }
        },

        async subscribeEmail(email: string) {
            try {
                const apiUrl = useRuntimeConfig().public.apiBaseUrl;
                const token = useCookie('tokenAccess').value;

                if (!token) throw new Error("No token available");

                const subscribeResponse = await $fetch<{error: number; message: string; userId: number}>(`${apiUrl}subscribes`, {
                    method: 'POST',
                    headers: {
                        "Content-Type" : "application/json",
                        "Authorization" : `Bearer ${token || ""}`,
                    },
                    body: { email },
                });

                if (subscribeResponse.error) throw new Error(subscribeResponse.message);

                notify({
                    message: 'Subscribed to discount emails successfully!',
                    type: 'success',
                    time: 3000,
                });

            } catch (e: any) {
                console.error('Error subscribe email: ', e);
                return Promise.reject(e?.response._data?.message || 'Something went wrong')
            }
        },

        async checkSubscribeEmail() {
            if (!this.authenticated || !useCookie('tokenAccess').value) return;

            try {
                const apiUrl = useRuntimeConfig().public.apiBaseUrl;
                const token = useCookie('tokenAccess').value;

                const infoSubscribeResponse = await $fetch<{error: number; data: InfoSubscribe; message: string }>(`${apiUrl}subscribes`, {
                    method: 'GET',
                    headers: {
                        "Content-Type" : "application/json",
                        "Authorization" : `Bearer ${token || ""}`,
                    },
                });

                if (infoSubscribeResponse.data) {
                    this.infoSubscribe = infoSubscribeResponse.data;
                }
                
            } catch (e: any) {
                console.error('Error subscribe email: ', e);
                return Promise.reject(e?.response._data?.message || 'Something went wrong')
            }
        },
    },
});