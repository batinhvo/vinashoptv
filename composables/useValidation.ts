import * as Yup from 'yup';

const validationRules = (rules: string): Yup.StringSchema => {
    const parsedRules = rules.split('|').map(rule => { //Chuỗi quy tắc được tách ra thành một mảng các quy tắc đơn lẻ, mỗi quy tắc có định dạng ruleName:value
        const [ruleName, value] = rule.split(':');
        return { ruleName, value };
    });

    let schema: Yup.StringSchema = Yup.string(); // Default schema as a string

    parsedRules.forEach(({ ruleName, value }) => {
        switch (ruleName) {
            case 'required':
                schema = schema.required('This field cannot be left empty');
                break;
            case 'min':
                schema = schema.min(Number(value), `Must be at least ${value} characters`);
                break;
            case 'max':
                schema = schema.max(Number(value), `Must not exceed ${value} characters`);
                break;
            case 'email':
                schema = schema.email('Invalid email format');
                break;
            case 'matches':
                schema = schema.matches(new RegExp(value), 'Invalid format');
                break;
            case 'phone':
                schema = schema.matches(/^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}?\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/, 'Invalid phone number');
                break;
            default:
                break;
        }
    });

    return schema;
    //Sau khi áp dụng tất cả các quy tắc, schema đã được chỉnh sửa sẽ được trả về. 
    // Schema này có thể được dùng với các phương thức của Yup để kiểm tra xem giá trị chuỗi có đáp ứng tất cả các quy tắc kiểm tra hay không.
}

export default validationRules;


