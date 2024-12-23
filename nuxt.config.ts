// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  imports: {
    autoImport: true,
  },
  devtools: { enabled: true },
  components: true,
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
  css: [
    '~/assets/css/tailwind.css',
    '~/assets/css/font-electro.css',
    '@fortawesome/fontawesome-free/css/all.css',
  ],
})