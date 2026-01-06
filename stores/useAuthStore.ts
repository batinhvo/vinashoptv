import type { DataProfileUser, DataRefresh, DataUser, InfoSubscribe, InputDataLogin, PassUser, UserInfo } from "types/userTypes";
const notify = useNotify();

export const useAuthStore = defineStore('auth', {
    
    state: () => ({
        authenticated: false,
        user: null as string | null,
        userInfo: null as UserInfo | null,
        refreshPromise: null as Promise<void> | null,

        infoSubscribeLoaded: false,
        infoSubscribe: {
            userId: undefined,
            isApplied: undefined
        } as { userId?: number; isApplied?: string },
    }),

    actions: {
        /* ---------------- LOGIN ---------------- */
        async authenticateUser({email, password}: InputDataLogin) {
            const apiUrl = useApi();

            try {
               
                const userResponse = await $fetch<{ error: number; data: DataUser; message: string }>(`${apiUrl}auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: { email, password, },
                });

                if (userResponse.error) throw new Error(userResponse.message);

                const access = useCookie('tokenAccess', { sameSite: 'lax' });
                const refresh = useCookie('tokenRefresh', { sameSite: 'lax' });

                access.value = userResponse.data.accessToken;
                refresh.value = userResponse.data.refreshToken;
                
                this.user = userResponse.data.name;
                this.authenticated = true;

                //await this.getInfoUser();

            } catch (e: any) {
                throw new Error(e?.message || 'Login failed');
            }; 
        },

         /* ---------------- LOGOUT ---------------- */
        logOut() {
            const route = useRoute();

            useCookie('tokenAccess').value = null;
            useCookie('tokenRefresh').value = null;

            localStorage.clear();
            this.$reset();

            const cartStore = useCartStore();
            cartStore.clearLocalCart();

            if (route.path === '/user') {
                navigateTo('/')
            }  
        },

        /* ---------------- RESTORE ---------------- */
        async restoreUser() {
            const token = useCookie('tokenAccess').value;
            if (!token) return;

            this.authenticated = true;
            //await this.getInfoUser();
        }, 

        /* ---------------- USER INFO ---------------- */
        async getInfoUser() {
            return this.safeRequest(async () => {
                const apiUrl = useApi();
                const token = useCookie('tokenAccess').value;

                const infoUserResponse = await $fetch<{ data: UserInfo }>(`${apiUrl}user/info`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                this.userInfo = infoUserResponse.data;
                this.user = infoUserResponse.data.firstName + ' ' + infoUserResponse.data.lastName ;
                this.authenticated = true;
            });
        },

        /* ---------------- REFRESH TOKEN ---------------- */
        async refreshAccessToken() {
            if (this.refreshPromise) return this.refreshPromise;         

            this.refreshPromise = (async () => {
                const apiUrl = useApi();       
                const refresh = useCookie('tokenRefresh').value;

                if (!refresh) throw new Error('No refresh token');

                const data = await $fetch<{ error: number; data: DataRefresh; message: string; }>(`${apiUrl}auth/refresh-token`, {
                    method: 'POST',
                    body: { refreshToken: refresh }
                });

                useCookie('tokenAccess').value = data.data.accessToken;
                useCookie('tokenRefresh').value = data.data.refreshToken;

            })();

            try {
                await this.refreshPromise;
            } catch {
                this.logOut();
            } finally {
                this.refreshPromise = null;
            }
        },

        /* ---------------- SAFE REQUEST ---------------- */
        async safeRequest<T>(
            callback: () => Promise<T>,
            timeout = 10000,
            retried = false
        ): Promise<T> {
            try {
               return await callback();

            } catch (e: any) {
                const status = e?.response?.status || e?.statusCode;
                const msg = e?.response?._data?.message || e?.data?.message || e?.message;

                const isTokenExpired = status === 401 || msg === 'jwt expired';
                if (isTokenExpired && !retried) {
                await this.refreshAccessToken();
                return this.safeRequest(callback, timeout, true);
            }
                throw e;
            }
        },

        /* ---------------- CHECK-EMAIL-SUBSCRIBE ---------------- */
        async checkSubscribeEmail() {
            return this.safeRequest(async () => {
                const res = await useApiFetch<{ data: InfoSubscribe }>(`subscribes`);
                this.infoSubscribe = res.data;
                this.infoSubscribeLoaded = true;
            });
        },

        /* ---------------- REGISTER ---------------- */
        async registerUser(profileData: any) {
            try {
                const apiUrl = useApi();
                await $fetch(`${apiUrl}auth/register`, {
                    method: 'POST',
                    body: profileData.value,                 
                });

            } catch (e: any) {
                console.error('Register user error: ', e);
                throw new Error(e?.response?._data?.message || 'Register failed');
            }
        },

        /* ---------------- FORGOT-PASSWORD ---------------- */
        async forgotPassword(email: string) {
            try {
                await useApiFetch(`auth/forgot-password`, {
                    method: 'POST',
                    body: {email: email},                   
                });
            } catch (e: any) {
                console.error('Error recover password: ', e);
                throw new Error(e?.response?._data?.message || 'Request failed');
            }
        },

        /* ---------------- RESET-PASSWORD ---------------- */
        async resetPasswordUser({ token, password }: { token: string; password: string }) {
            try {
                await useApiFetch(`auth/reset-password`, {
                    method: 'POST',
                    body: { token, password },            
                });
            } catch (e: any) {
                console.error('Reset password error:', e);
                throw new Error(e?.response?._data?.message || 'Reset password failed');
            }
        },

        /* ---------------- UPDATE-PROFILE-USER ---------------- */
        async updateProfileUser(payload: DataProfileUser) {

            await this.safeRequest(async () => {
                await useApiFetch(`auth`, {
                    method: 'PATCH',
                    body: payload,
                });
            });

            await this.getInfoUser();
        },

        /* ---------------- CHANGE-PASSWORD ---------------- */
        async updatePasswordUser({currentPassword, newPassword}: PassUser) {

            return this.safeRequest(async () => {
                await useApiFetch(`auth/change-password`, {
                    method: 'PATCH',                  
                    body: { currentPassword, newPassword },
                });
            });

        },

        /* ---------------- SUBSCRIBE-EMAIL ---------------- */
        async subscribeEmail(email: string) {
            return this.safeRequest(async () => {
                const res = await useApiFetch<{ userId: number }>(`subscribes`, {
                    method: 'POST',
                    body: { email },
                });

                this.infoSubscribe.userId = res.userId;
                this.infoSubscribeLoaded = false;

                notify({
                    message: 'Subscribed to discount emails successfully!',
                    type: 'success',
                    time: 3000,
                });
            });

        },

    },
});