export const useApi = () => {
  const config = useRuntimeConfig();

  const apiUrl = import.meta.browser
    ? config.public.apiBaseUrl
    : config.public.apiBaseServer;
  return apiUrl;
};