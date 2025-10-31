import type { OrderHistory } from "types/orderTypes";

export const useOrderStore = defineStore('order', {

    state: () => ({
        orderData: [] as OrderHistory[],
        orderCount: null as number | null,
    }),

    actions: {
        async getDataOrderHistory() {
            try {
                const apiUrl = useApi();
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

        async getDataFilterOrderHistory(params: any) {
            try {
                const apiUrl = useApi();
                const token = useCookie('tokenAccess').value;

                const dataOrderResponse = await $fetch<{error: number; data: { list: OrderHistory[], count: number } }>(`${apiUrl}invoices?${params}`, {
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
            const apiUrl = useApi();
            const notify = useNotify();
            try {
                const orderResponse = await $fetch<{error: number; data: any}>(`${apiUrl}invoices`, {
                    method: 'POST',
                    headers: {
                        "Content-Type" : "application/json",                       
                    },
                    body: JSON.stringify(payload)
                });

                if (!orderResponse || !orderResponse.data) {
                    throw new Error('Empty response from server. Unable to process the order.');
                }

                if (orderResponse) {
                    const urlPattern = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
                    
                    if (urlPattern.test(orderResponse.data)) {
                        
                        window.location.href = orderResponse.data;

                    } else {    
                        //CARD
                        notify({
                            message: 'Order Placed Successfully. Thank you for shopping with us!',
                            type: 'success',
                            time: 5000,
                        });                           
                        setTimeout(() => {
                            //window.location.href = "/";
                        }, 5000);               
                    }
                }
                
            } catch (e: any) {
                console.error('Error order: ', e);
                return Promise.reject(
                    e?.message || e?.response?._data?.message || 'Something went wrong while submitting the order'
                );
            }
        },

        async handleAfterPaypalReturn(token: string, payerId: string) {
            try {
                const apiUrl = useApi();

                const response = await $fetch<{ error: number; message: string }>(`${apiUrl}invoices/paypal?token=${token}&payerId=${payerId}`,{
                        method: "GET",
                        headers: {"Content-Type": "application/json"},
                    }
                );

                return {
                    error: response.error,
                    message: response.message,
                };

            } catch (e: any) {
                console.error("Error in handleAfterPaypalReturn:", e);
                return {
                    error: 1,
                    message: "An error occurred while confirming PayPal payment."
                };
            }
        },
    }
});
