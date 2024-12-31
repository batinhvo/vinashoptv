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
    confirmPassword: Yup
        .string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
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
    state: Yup
        .string()
        .required('This field cannot be left empty')
        .optional(),  
    city: Yup
        .string()
        .required('This field cannot be left empty')
        .optional(),  
    postCode: Yup
        .string()
        .required('This field cannot be left empty')
        .optional(),  
    agree: Yup
        .boolean()
        .oneOf([true], "You must accept the terms and conditions")
        .optional(),  
    receiveEmail: Yup
        .boolean()
        .optional(),  
    message: Yup
        .string()
        .optional(),
    isDifferentAddress : Yup.boolean(),
    // emailDif: Yup.string().when('isDifferentAddress', {
    //     is: true,
    //     then: Yup.string().email('Invalid email').required('This field cannot be left empty'),
    //     otherwise: Yup.string().notRequired(),
    // }),
    emailDif: Yup.string().when('receiveEmail', (a, schema) => {
        console.log(a)
        return a ? schema.notRequired() : schema.email('Invalid email').required('This field cannot be left empty');
    }),
    firstNameDif: Yup
        .string()
        .matches(/^[A-Za-z\s]+$/, 'First name must not contain numbers')
        .required('This field cannot be left empty')
        .optional(),
    lastNameDif: Yup
        .string()
        .matches(/^[A-Za-z\s]+$/, 'Last name must not contain numbers')
        .required('This field cannot be left empty')
        .optional(),
    phoneDif: Yup
        .string()
        .matches(/^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}?\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/, 'Invalid phone number')
        .required('This field cannot be left empty')
        .optional(),
    addressDif: Yup
        .string()
        .required('This field cannot be left empty')
        .optional(),
    stateDif: Yup
        .string()
        .required('This field cannot be left empty')
        .optional(),  
    cityDif: Yup
        .string()
        .required('This field cannot be left empty')
        .optional(),  
    postCodeDif: Yup
        .string()
        .required('This field cannot be left empty')
        .optional(), 
});

export type SignFormData = Yup.InferType<typeof formSchema>;

