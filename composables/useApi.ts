export const useApi = () => {
    const get = async (url: string, params = {}) => {
        try {
            const query = new URLSearchParams(params).toString();
            const fullUrl = query ? `${url}?${query}` : url;
            return await $fetch(fullUrl);
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };
    
    const post = async (url: string, body: Record<string, any>) => {
        try {
          return await $fetch(url, {
            method: 'POST',
            body,
          });
        } catch (error) {
          console.error('Error posting data:', error);
          throw error;
        }
    };
    
    const put = async (url: string, body: Record<string, any>) => {
        try {
          return await $fetch(url, {
            method: 'PUT',
            body,
          });
        } catch (error) {
          console.error('Error updating data:', error);
          throw error;
        }
    };
    
    const del = async (url: string) => {
        try {
          return await $fetch(url, {
            method: 'DELETE',
          });
        } catch (error) {
          console.error('Error deleting data:', error);
          throw error;
        }
    };

    return { get, post, put, del};
};