export const useModal = () => {
    const isVisible = ref<boolean>(false);
  
    const open = (): void => {
        isVisible.value = true;
    };
  
    const close = (): void => {
        isVisible.value = false;
    };
  
    return {
        isVisible,
        open,
        close,
    };
};