// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  ssr: true,
  imports: {
    autoImport: true,
  },
  devtools: { enabled: true },
  plugins: ['~/plugins/veeValidate.ts'],
  components: true,
  modules: [
    '@nuxtjs/tailwindcss', 
    '@nuxt/image', 
    '@vee-validate/nuxt', 
    '@pinia/nuxt',
  ],
  css: [
    '~/assets/css/tailwind.css',
    '~/assets/css/font-electro.css',
    '@fortawesome/fontawesome-free/css/all.css',
  ],
})