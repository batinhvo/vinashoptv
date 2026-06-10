export const useRecaptcha = () => {
    const config = useRuntimeConfig()

    const execute = async (action: string) => {
        return new Promise<string>((resolve, reject) => {
        if (!window.grecaptcha) {
            reject('reCAPTCHA chưa load')
            return
        }

        window.grecaptcha.ready(() => {
            window.grecaptcha
            .execute(config.public.recaptchaSiteKey, {
                action
            })
            .then(resolve)
            .catch(reject)
        })
        })
    }

    return {
        execute
    }
}