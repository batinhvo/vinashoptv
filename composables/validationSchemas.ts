import * as Yup from 'yup';

export const formSchema = Yup.object().shape({
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
    emailDif: Yup.string().when('isDifferentAddress', {
        is: true, 
        then: (schema) => schema.email('Invalid email').required('This field cannot be left empty'),
        otherwise: (schema) => schema.notRequired(),
    }),
    firstNameDif: Yup.string().when('isDifferentAddress', {
        is: true, 
        then: (schema) => schema.matches(/^[A-Za-z\s]+$/, 'First name must not contain numbers').required('This field cannot be left empty'),
        otherwise: (schema) => schema.notRequired(),
    }),
    lastNameDif: Yup.string().when('isDifferentAddress', {
        is: true, 
        then: (schema) => schema.matches(/^[A-Za-z\s]+$/, 'Last name must not contain numbers').required('This field cannot be left empty'),        
        otherwise: (schema) => schema.notRequired(),
    }),
    phoneDif: Yup.string().when('isDifferentAddress', {
        is: true, 
        then: (schema) => schema.matches(/^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}?\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/, 'Invalid phone number').required('This field cannot be left empty'),      
        otherwise: (schema) => schema.notRequired(),
    }),
    addressDif: Yup.string().when('isDifferentAddress', {
        is: true, 
        then: (schema) => schema.required('This field cannot be left empty'),
        otherwise: (schema) => schema.notRequired(),
    }),
    stateDif: Yup.string().when('isDifferentAddress', {
        is: true, 
        then: (schema) => schema.required('This field cannot be left empty'),
        otherwise: (schema) => schema.notRequired(),
    }), 
    cityDif: Yup.string().when('isDifferentAddress', {
        is: true, 
        then: (schema) => schema.required('This field cannot be left empty'),
        otherwise: (schema) => schema.notRequired(),
    }),
    postCodeDif: Yup.string().when('isDifferentAddress', {
        is: true, 
        then: (schema) => schema.required('This field cannot be left empty'),
        otherwise: (schema) => schema.notRequired(),
    }),
});

export type SignFormData = Yup.InferType<typeof formSchema>;

