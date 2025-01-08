import { useValidation } from "./useValidation";

export function useFormValidation() {
    const formData = ref({
        password: '',
        newPass: '',
        confPass: ''
    });

    const errors = ref({
        password: '',
        newPass: '',
        confPass: ''
    });

    //gọi hàm khi mất focus
    const validate = (filed: string, validationString: string) => {
        const validationSchema = useValidation(validationString);

        //xóa lỗi cũ trước khi test lại
        errors.value[filed] = '';

        try {
            validationSchema.validateSync(formData.value[filed]);
        } catch (error: any) {
            errors.value[filed] = error.message;
        }
    };

    //xử lí submit form
    const submitForm = () => {
        alert("gửi rồi nghen");
    }

    return {
        formData,
        errors,
        validate,
        submitForm
    }
}