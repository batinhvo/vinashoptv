import type { OrderHistory } from "types/orderTypes";

export const useOrderStore = defineStore('order', {
    state: () => ({
        orderData: [] as OrderHistory[],
        orderCount: 0 as number,
    }),

    actions: {

        /* ---------------- GET DATA ORDER ---------------- */
        async fetchOrders(query: string) {
            const apiUrl = useApi();            
            const authStore = useAuthStore();

            return authStore.safeRequest(async () => {
                const token = useCookie('tokenAccess').value;

                const res = await $fetch<{ error: number; data: { list: OrderHistory[]; count: number }; }>(`${apiUrl}invoices?${query}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.error !== 0) {
                    throw new Error('Failed to fetch orders');
                }

                this.orderData = res.data.list;
                this.orderCount = res.data.count;
            });
        },

        async submitOrder(payload: any) {            
            const apiUrl = useApi();
            const notify = useNotify();
            const authStore = useAuthStore();

            return authStore.safeRequest(async () => {
                const token = useCookie('tokenAccess').value;

                const res = await $fetch<{ data: string }>(`${apiUrl}invoices`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: payload,
                });

                const isUrl = /^https?:\/\//i.test(res.data);

                if (isUrl) {
                    window.location.href = res.data;
                    return;
                }

                notify({
                    message: 'Order placed successfully!',
                    type: 'success',
                    time: 4000,
                });

                setTimeout(() => navigateTo('/'), 4000);
            });
        },

        async handleAfterPaypalReturn(token: string, payerId: string) {
            try {
                const apiUrl = useApi();

                return await $fetch<{ error: number; message: string }>(`${apiUrl}invoices/paypal`, {
                    query: { token, payerId },
                });

            } catch (e: any) {
                console.error('Paypal confirm error:', e);
                return {
                    error: 1,
                    message: 'Paypal confirmation failed',
                };
            }
        },

        // async handleAfterPaypalReturn(token: string, payerId: string) {
        //     try {
        //         const apiUrl = useApi();

        //         const response = await $fetch<{ error: number; message: string }>(`${apiUrl}invoices/paypal?token=${token}&payerId=${payerId}`,{
        //                 method: "GET",
        //                 headers: {"Content-Type": "application/json"},
        //             }
        //         );

        //         return {
        //             error: response.error,
        //             message: response.message,
        //         };

        //     } catch (e: any) {
        //         console.error("Error in handleAfterPaypalReturn:", e);
        //         return {
        //             error: 1,
        //             message: "An error occurred while confirming PayPal payment."
        //         };
        //     }
        // },
    }
});
