import { defineRule } from 'vee-validate'

export default defineNuxtPlugin(() => {
    defineRule('required', (value: string | undefined) => {
        if (!value || !value.length) {
            return 'This field cannot be left empty';
        }
        return true;
    });
    
    defineRule('email', (value: string | undefined) => {
        if (!value || !value.length) {
          return true;
        }       
        if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/.test(value)) {
          return 'This field must be a valid email';
        }
        return true;
    });

    defineRule('emailExist', async (value: string | undefined) => {
        if (!value || !value.length) {
            return true; // Nếu không có giá trị, phép kiểm tra sẽ bỏ qua
        }

        // Kiểm tra định dạng email bằng biểu thức chính quy
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!emailPattern.test(value)) {
            return 'This field must be a valid email';
        }

        // Kiểm tra email bất đồng bộ (ví dụ, kiểm tra trên server)
        const isEmailTaken = await checkEmailAvailability(value); // Hàm kiểm tra email có sẵn trên server
        if (isEmailTaken) {
            return 'Email address already exists';
        }

        return true;
    });
    
    defineRule('min', (value: string | undefined, [limit]: [number]) => {
        if (!value || value.length === 0) {
          return true;
        }
        if (value.length < limit) {
          return `This field must be at least ${limit} characters`;
        }
        return true;
    });
    
    defineRule('max', (value: string | undefined, [limit]: [number]) => {
        if (!value || value.length === 0) {
          return true;
        }
        if (value.length > limit) {
          return `This field must be at most ${limit} characters`;
        }
        return true;
    });

    defineRule('confirmed', (value: string | undefined, [targetValue]: [string]) => {
        if (value !== targetValue) {
            return 'The passwords do not match';
        }
        return true;
    });
});

async function checkEmailAvailability(email: string): Promise<boolean> {
    const takenEmails = ['test@example.com', 'existing@example.com']; // Danh sách email đã tồn tại (ví dụ)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(takenEmails.includes(email));
        }, 1000);
    });
}

