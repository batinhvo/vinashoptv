import type { NitroFetchOptions } from 'nitropack';

export async function useApiFetch<T>(
    url: string,
    options: NitroFetchOptions<string> = {}
) {
    const apiUrl = useApi();
    const token = useCookie('tokenAccess');
    const authStore = useAuthStore();

    const headers: HeadersInit = {
        ...(token.value ? { Authorization: `Bearer ${token.value}` } : {}),
        ...(options.headers as HeadersInit),
    };

    // Auto add Content-Type only when sending body
    if (options.body && !(headers as Record<string, unknown>)['Content-Type']) {
        (headers as Record<string, string>)['Content-Type'] = 'application/json';
    }

    try {
        return await $fetch<T>(`${apiUrl}${url}`, {
            ...options,
            headers,
        });
    } catch (err: any) {
        // ⛔ token hết hạn
        if (err?.response?.status === 401 && token.value) {
            
            await authStore.refreshAccessToken();

        return await $fetch<T>(`${apiUrl}${url}`, {
                ...options,
                headers: {
                ...(token.value ? { Authorization: `Bearer ${token.value}` } : {}),
                ...(options.headers as HeadersInit),
                },
            });
        }

        throw err;
    }
}