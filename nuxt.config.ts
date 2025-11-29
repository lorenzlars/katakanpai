import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/test-utils/module',
  ],

  ssr: false,

  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
    },
  },

  css: ['./app/assets/css/main.css'],

  runtimeConfig: {
    public: {
      mode: process.env.MODE,
    },
  },

  compatibilityDate: '2025-07-15',

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  typescript: {
    typeCheck: true,
    strict: true,
    shim: true,
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  i18n: {
    strategy: 'no_prefix',
    locales: [
      { code: 'en', file: 'en-GB.json' },
      { code: 'ja', file: 'ja-JP.json' },
      { code: 'de', file: 'de-DE.json' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
    },
    defaultLocale: 'en',
  },
})
