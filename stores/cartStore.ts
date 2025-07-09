import type {  ProductDetails, Products } from "types/productTypes";

export const useCartStore = defineStore('cart', {

    state: () => ({
            
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
    },
});