export const useApi = () => {
  const config = useRuntimeConfig();

  const apiUrl = import.meta.browser
    ? config.public.apiBaseUrl
    : config.apiBaseServer;

  return apiUrl;
};