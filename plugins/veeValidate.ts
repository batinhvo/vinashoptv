import { defineRule } from 'vee-validate'

export default defineNuxtPlugin(() => {
    defineRule('required', (value: string | undefined) => {
      if (!value || !value.length) {
          return 'This field cannot be left empty';
      }
      return true;
    });

    defineRule('booRequired', (value: boolean | undefined) => {
      if (!value) {
        return 'This field must be checked';
      }
      return true;
    });
    
    defineRule('email', (value: string | undefined) => {
      if (!value || !value.length) {
        return true;
      }       
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'This field must be a valid email';
      }
      return true;
    });

    defineRule('phone', (value: string | undefined) => {
      if (!value || !value.length) {
          return true;
      }
      // Biểu thức chính quy cho số điện thoại Mỹ
      const phoneRegex = /^(?:\+1\s?)?(\([2-9]{1}[0-9]{2}\)|[2-9]{1}[0-9]{2})[\s.-]?[2-9]{1}[0-9]{2}[\s.-]?[0-9]{4}$/;
      if (!phoneRegex.test(value)) {
          return 'This field must be a valid US phone number';
      }
      return true;
    });
    
    defineRule('minLength', (value: string | undefined, [limit]: [number]) => {
      if (!value || value.length === 0) {
        return true;
      }
      if (value.length < limit) {
        return `This field must be at least ${limit} characters`;
      }
      return true;
    });
    
    defineRule('maxLength', (value: string | undefined, [limit]: [number]) => {
      if (!value || value.length === 0) {
        return true;
      }
      if (value.length > limit) {
        return `This field must be at most ${limit} characters`;
      }
      return true;
    });

    defineRule('min', (value: string | undefined, [limit]: [number]) => {
      if (!value || !value.length) {
        return true;
      }
      const numValue = Number(value);
      if (numValue < limit) {
        return `This field must be greater than ${limit}`;
      }
      return true;
    });

    defineRule('max', (value: string | undefined, [limit]: [number]) => {
      if (!value || !value.length) {
        return true;
      }
      const numValue = Number(value);
      if (numValue > limit) {
        return `This field must be less than ${limit}`;
      }
      return true;
    });

    defineRule('zipcode', (value: number | undefined) => {
      if (!value || !value.toString().length) {
        return 'This field cannot be left empty';
      }

      const regex = /^\d{5}(-\d{4})?$/;
      if (!regex.test(value.toString())) {
        return 'Invalid ZIP Code format';
      }

      return true;
    });

    defineRule('confirmed', (value: string | undefined, [targetValue]: [string]) => {
      if (!value || !targetValue) {
          return true;
      }
      if (value !== targetValue) {
          return 'The passwords do not match';
      }
      return true;
    });

    defineRule('stateSelect', (value: string) => {
      return value ? true : 'Please select a state';
    });

    defineRule('citySelect', (value: string) => {
      return value ? true : 'Please select a city';
    });

    defineRule('selectRequired', (value: string) => {
      return value ? true : 'Please select an option';
    });

    // defineRule('checkString', (value: string | undefined, [checkValue]: [string]) => {
    //     console.log(checkValue)
    //     if (!value || !value.includes(checkValue)) {
    //         return `The input must contain the character or string "${checkValue}"`; // Trả về lỗi nếu không khớp
    //     }
    //     return true;
    // });

    // defineRule('emailExist', async (value: string | undefined) => {
    //     if (!value || !value.length) {
    //         return true; // Nếu không có giá trị, phép kiểm tra sẽ bỏ qua
    //     }

    //     // Kiểm tra định dạng email bằng biểu thức chính quy
    //     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     if (!emailPattern.test(value)) {
    //         return 'This field must be a valid email';
    //     }

    //     // Kiểm tra email bất đồng bộ (ví dụ, kiểm tra trên server)
    //     const isEmailTaken = await checkEmailAvailability(value); // Hàm kiểm tra email có sẵn trên server
    //     if (isEmailTaken) {
    //         return 'Email address already exists';
    //     }

    //     return true;
    // });
});

// async function checkEmailAvailability(email: string): Promise<boolean> {
//     const takenEmails = ['test@example.com', 'existing@example.com']; // Danh sách email đã tồn tại (ví dụ)
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(takenEmails.includes(email));
//         }, 1000);
//     });
// }

