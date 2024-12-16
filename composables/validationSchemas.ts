import * as Yup from 'yup';

export const formSchema = Yup.object({
    email: Yup
        .string()
        .email('Invalid email')
        .required('This field cannot be left empty')
        .optional(),
    password: Yup
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .required('This field cannot be left empty')
        .optional(),
    firstName: Yup
        .string()
        .matches(/^[A-Za-z\s]+$/, 'First name must not contain numbers')
        .required('This field cannot be left empty')
        .optional(),
    lastName: Yup
        .string()
        .matches(/^[A-Za-z\s]+$/, 'Last name must not contain numbers')
        .required('This field cannot be left empty')
        .optional(),
    phone: Yup
        .string()
        .matches(/^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}?\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/, 'Invalid phone number')
        .required('This field cannot be left empty')
        .optional(),
    address: Yup
        .string()
        .required('This field cannot be left empty')
        .optional(),
    message: Yup
        .string()
        .optional(),
});

export type SignFormData = Yup.InferType<typeof formSchema>;

