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
      apiBaseUrl: process.env.NODE_ENV === 'production'
        ? 'https://vinashoptv.com/api/v1/'
        : 'http://localhost:3001/api/v1/',
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },
  nitro: {
    port: process.env.PORT || 3002,
    host: process.env.HOST || '0.0.0.0'
  },
  vite: {
    server: {
      // Thêm tên miền của bạn vào danh sách cho phép
      allowedHosts: [
        'beta.vinashoptv.com',
        // Bạn có thể thêm các tên miền khác nếu cần (ví dụ: 'localhost', '127.0.0.1')
      ],
    },
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
