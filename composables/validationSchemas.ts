import * as Yup from 'yup';

export const formSchema = Yup.object({
    email: Yup
    .string()
    .email('Invalid email')
    .required('This field cannot be left empty'),
    password: Yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .required('This field cannot be left empty'),
});

export type SignFormData = Yup.InferType<typeof formSchema>;

