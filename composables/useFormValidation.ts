import { useForm, useField} from 'vee-validate';
import validationRules from './useValidation';

export const useFormValidation = (fields: any[]) => {
    const validationSchema: Record<string, any> = {};

    fields.forEach((field) => {
        const rules = field.validation || ''; // Lấy quy tắc từ data-validation
        validationSchema[field.name] = validationRules(rules);
    });

    const { handleSubmit, errors } = useForm({
        validationSchema,
    });

   // Dùng reduce để xây dựng formFields
    const formFields = fields.reduce((acc, field) => {
        const { value, errorMessage } = useField(field.name);
        acc[field.name] = { value, errorMessage };  // Tích lũy giá trị vào đối tượng
        return acc;
    }, {} as Record<string, { value: any, errorMessage: string }>); // Khởi tạo kiểu đúng

    const onSubmit = (values: { [key: string]: any }) => {
        console.log('Form Submitted:', values);
    }

    return {
        formFields,
        handleSubmit: handleSubmit(onSubmit),
        errors,
    };
}


