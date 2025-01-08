import * as Yup from 'yup';

//tạo kiểu qui tắc valid
type ValidationRuleMap = {
    [key: string]: (schema: Yup.StringSchema, arg?: number) => Yup.StringSchema;
};

const minLength = 8;
const maxLength = 8;

//qui tắc
export function useValidation(validationString: string): Yup.StringSchema {
    const rules = validationString.split('|');
    let schema: Yup.StringSchema = Yup.string(); //định nghĩa schema là string  
    const rule: ValidationRuleMap = {
        required: (schema) => schema.required('This field cannot be left empty'),
        email: (schema) => schema.email('Invalid email'),
        min: (schema, minLength) => schema.min(minLength, `Must be at least ${minLength} characters`),
        max: (schema, maxLength) => schema.max(maxLength, `Must be at least ${maxLength} characters`),
        phone: (schema) => schema.matches(/^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}?\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/, 'Invalid phone number'),
    }

    // Áp dụng các quy tắc vào schema
    schema = rules.reduce((acc: Yup.StringSchema, rule: string): Yup.StringSchema => {
        const [ruleName, arg] = rule.split(':');
        const numericArg = arg ? Number(arg) : undefined;

        // Kiểm tra và áp dụng quy tắc vào schema
        if (rules[ruleName]) {
            return numericArg ? rules[ruleName](acc, numericArg) : rules[ruleName](acc);
        }
        return acc;
    }, schema);

    return schema;
}


