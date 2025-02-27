import type { DataProfileUser, DataUser, InputDataLogin, PassUser, UserInfo } from "types/userTypes";

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

                if (userResponse.error) {
                    return Promise.reject(userResponse.message);
                }

                if (userResponse.data) {
                    const tokenAccess = useCookie('tokenAccess');
                    tokenAccess.value = userResponse.data.accessToken;

                    const tokenRefresh = useCookie('tokenRefresh');
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
            const tokenAccess = useCookie('tokenAccess'); // useCookie new hook in nuxt 3
            tokenAccess.value = null; // clear the token cookie
            const tokenRefresh = useCookie('tokenRefresh'); 
            tokenRefresh.value = null;
            
            localStorage.removeItem('user');

            this.authenticated = false; // set authenticated  state value to false
            this.user = null;
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

        async refreshAccessToken() {
            const apiUrl = useRuntimeConfig().public.apiBaseUrl;
            const tokenRefresh = useCookie('tokenRefresh');
            
            if (!tokenRefresh.value) return null;

            try {
                const data  = await $fetch(`${apiUrl}user/info`, {
                    method: 'POST',
                    body: { refreshToken: tokenRefresh.value },
                    headers: {
                        "Content-Type" : "application/json",
                        "Authorization" : `Bearer ${tokenRefresh.value || ""}`,
                    },
                });

                if (data) {
                    console.log(data);
                }
            } catch (error: any) {
                console.error('Failed to refresh token', error);
            }
        },

        async getInfoUser() {
            if(!this.authenticated) return

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
                console.error('Error get info user: ', e)
            }
        },

        async updateProfileUser({address, cityId, firstName, lastName, phone, state, zip}: DataProfileUser) {
            try {
                const apiUrl = useRuntimeConfig().public.apiBaseUrl;
                const token = useCookie('tokenAccess').value;

                const profileResponse = await $fetch<{error: number; message: string}>(`${apiUrl}auth`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type" : "application/json",
                        "Authorization" : `Bearer ${token || ""}`,
                    },
                    body: { address, cityId, firstName, lastName, phone, state, zip },
                });
                
                if (profileResponse.error === 1) {
                   console.error("Error update profile user: ", profileResponse.message);
                   return Promise.reject(profileResponse.message);
                }
            } catch (e: any) {
                console.error('Error update profile user: ', e);
                return Promise.reject(e?.response._data?.message || 'Something went wrong')
            }
        },

        async updatePasswordUser({currentPassword, newPassword}: PassUser) {
            try {
                const apiUrl = useRuntimeConfig().public.apiBaseUrl;
                const token = useCookie('tokenAccess').value;

                console.log(currentPassword, newPassword)

                const changePassResponse = await $fetch<{error: number; message: string}>(`${apiUrl}auth/change-password`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type" : "application/json",
                        "Authorization" : `Bearer ${token || ""}`,
                    },
                    body: { currentPassword, newPassword },
                });
  
                if (changePassResponse.error) {
                   console.error("Error update passowrd user: ", changePassResponse.message);
                }
            } catch (e: any) {
                console.error('Error update password user: ', e);
            }
        },


    },
});