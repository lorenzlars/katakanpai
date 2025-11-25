import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({

  modules: ['@nuxt/eslint', '@vueuse/nuxt', '@nuxt/ui', '@pinia/nuxt', '@nuxtjs/i18n'],

  ssr: false,

  devtools: { enabled: true },

  app: {
    head: {
      title: 'Katakanpai',
      meta: [
        { name: 'description', content: 'A fun drinking game where you guess brand names from katakana characters. Test your Japanese reading skills and enjoy with friends!' },
      ],
    },
  },

  css: ['./app/assets/css/main.css'],

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
    ],
    detectBrowserLanguage: {
      useCookie: false,
    },
    defaultLocale: 'en',
  },
})
