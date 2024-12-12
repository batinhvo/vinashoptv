import { reactive, ref } from 'vue';
import { formSchema, type SignFormData } from './validationSchemas';

const notify = useNotify();

export const useSignIn = () => {
    // Dữ liệu form
    const formData = reactive<SignFormData>({
        email: '',
        password: '',
    });
  
    // Lưu trạng thái lỗi
    const errors = reactive<{ [key in keyof SignFormData]?: string }>({});
    const isSubmitting = ref(false);
  
    // Hàm xác thực form
    const validateForm = async (): Promise<boolean> => {
        try {
                // Reset lỗi trước khi validate
                for (const key in errors) {
                delete errors[key as keyof SignFormData];
            }
            // Thực hiện xác thực
            await formSchema.validate(formData, { abortEarly: false });
                return true;
        } catch (err: any) {
            if (err.inner) {
                err.inner.forEach((validationError: any) => {
                    errors[validationError.path as keyof SignFormData] = validationError.message;
                });
            }
            return false;
        }
    };
  
    // Hàm xử lý khi submit form
    const onSubmit = async () => {
        isSubmitting.value = true;
        const isValid = await validateForm();
        if (isValid) {          
            notify({
                message: 'Success',
                type: 'success',
                time: 1000
            });
        } else {
            console.log('Form is invalid', errors);
            notify({
                message: 'Errord',
                type: 'error',
                time: 1000
            });
        }
        isSubmitting.value = false;
    };
  
    return {
        formData,
        errors,
        isSubmitting,
        onSubmit,
    };
};

