import type { DataProfileUser, DataRefresh, DataUser, InfoSubscribe, InputDataLogin, PassUser, UserInfo } from "types/userTypes";
const notify = useNotify();

export const useAuthStore = defineStore('auth', {
    
    state: () => ({
        infoSubscribeLoaded: false,
        authenticated: false,
        user: null as string | null,
        userInfo: null as UserInfo | null,
        //infoSubscribe: null as InfoSubscribe | null,
        infoSubscribe: {
            userId: undefined,
            isApplied: undefined
        } as { userId?: number; isApplied?: string },
    }),

    actions: {
        async authenticateUser({email, password}: InputDataLogin) {
            try {
                const apiUrl = useApi();
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
                    window.location.reload();
                    //refreshNuxtData();
                    
                }
            } catch (e: any) {
                console.error("Login failed: ", e);
                return Promise.reject(e?.response._data?.message || 'Something went wrong')
            }; 
        },

        logOut() {
            const route = useRoute();

            useCookie('tokenAccess').value = null;
            useCookie('tokenRefresh').value = null; 

            localStorage.removeItem('cart_merged_after_login');
            localStorage.removeItem('cart_data');
            localStorage.removeItem('user');

            this.authenticated = false; 
            this.userInfo = null;
            this.user = null;
            //window.location.reload();

            const cartStore = useCartStore();
            cartStore.clearLocalCart();
            //navigateTo('/');

            if (route.path === '/user') {
                navigateTo('/')
            }
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
                const apiUrl = useApi();
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
                    await this.getInfoUser();
                }

            }
        },

        async refreshAccessToken() {
            const apiUrl = useApi();       
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

        async registerUser(profileData: any) {
            try {
                const apiUrl = useApi();
                await $fetch(`${apiUrl}auth/register`, {
                    method: 'POST',
                    body: profileData.value,
                    headers: {
                    'Content-Type': 'application/json'
                    }
                });
            } catch (e) {
                console.error('Error update profile user: ', e);
                return Promise.reject((e as Error)?.message || 'Something went wrong')
            }
        },

        async forgotPassword(email: string) {
            try {
                const apiUrl = useApi();
                await $fetch(`${apiUrl}auth/forgot-password`, {
                    method: 'POST',
                    body: {email: email},
                    headers: {
                    'Content-Type': 'application/json'
                    }
                });
            } catch (e: any) {
                console.error('Error recover password: ', e);
                return Promise.reject(e?.response._data?.message || 'Something went wrong')
            }
        },

        async resetPasswordUser(infoPass: {token:string;password:string}) {
            try {
                const apiUrl = useApi();
                await $fetch(`${apiUrl}auth/reset-password`, {
                    method: 'POST',
                    body: {
                        password: infoPass.password,
                        token: infoPass.token
                    },
                    headers: {
                    'Content-Type': 'application/json'
                    }
                });
            } catch (e: any) {
                console.error('Error recover password: ', e);
                return Promise.reject(e?.response._data?.message || 'Something went wrong')
            }
        },

        async updateProfileUser({address, cityId, country, firstName, lastName, phone, state, zip}: DataProfileUser) {
            try {
                const apiUrl = useApi();
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
                const apiUrl = useApi();
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
                const apiUrl = useApi();
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

                this.infoSubscribe.userId = subscribeResponse.userId; 
                this.infoSubscribeLoaded = false;              

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
                const apiUrl = useApi();
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
                    this.infoSubscribeLoaded = false;                         
                } else {
                    this.infoSubscribeLoaded = true;      
                }
                
            } catch (e: any) {
                console.error('Error subscribe email: ', e);
                return Promise.reject(e?.response._data?.message || 'Something went wrong')
            }
        },
    },
});