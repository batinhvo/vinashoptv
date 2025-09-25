import type { OrderHistory } from "types/orderTypes";

export const useOrderStore = defineStore('order', {

    state: () => ({
        orderData: [] as OrderHistory[],
        orderCount: null as number | null,
    }),

    actions: {
        async getDataOrderHistory() {
            try {
                const apiUrl = useRuntimeConfig().public.apiBaseUrl;
                const token = useCookie('tokenAccess').value;

                const dataOrderResponse = await $fetch<{error: number; data: { list: OrderHistory[], count: number } }>(`${apiUrl}invoices?page=1&perPage=8&status=pending`, {
                    method: 'GET',
                    headers: {
                        "Content-Type" : "application/json",
                        "Authorization" : `Bearer ${token || ""}`,
                    },
                });

                if (dataOrderResponse.error !== 0) {
                    console.error('Error get order history');
                }

                if (dataOrderResponse.data) {
                    this.orderData = dataOrderResponse.data.list;
                    this.orderCount = dataOrderResponse.data.count;
                }

            } catch (e: any) {
                console.error('Error get order history: ', e)
            }
        },

        async submitOrder(payload: any) {
            const apiUrl = useRuntimeConfig().public.apiBaseUrl;

            try {
                const orderResponse = await $fetch<{error: number; data: number}>(`${apiUrl}invoices`, {
                    method: 'POST',
                    headers: {
                        "Content-Type" : "application/json",                       
                    },
                    body: JSON.stringify(payload)
                });

                if(orderResponse) console.log(orderResponse.data);
                
            } catch (e: any) {
                console.error('Error order: ', e);
                return Promise.reject(e?.response._data?.message || 'Something went wrong');
            }
        },
    },
});