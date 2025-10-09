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
  runtimeConfig: {
    public: {
      apiBaseUrl: 'https://vinashoptv.com/api/v1/',
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },
  devServer: {
    port: 3001, 
    host: '0.0.0.0',
  },
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