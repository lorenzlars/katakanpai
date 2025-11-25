import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  ssr: false,

  devtools: { enabled: true },

  css: ['./app/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  modules: ['@nuxt/eslint', '@vueuse/nuxt', '@nuxt/ui', '@pinia/nuxt', '@nuxtjs/i18n'],

  app: {
    head: {
      title: 'Katakanpai',
      meta: [
        { name: 'description', content: 'A fun drinking game where you guess brand names from katakana characters. Test your Japanese reading skills and enjoy with friends!' }
      ]
    }
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
      { code: 'en', language: 'en-GB', file: 'en.json' },
      { code: 'ja', language: 'ja-JP', file: 'ja.json' },
    ],
    langDir: '../locales',
    vueI18n: '../i18n.config.ts',
    detectBrowserLanguage: {
      useCookie: false,
    },
    defaultLocale: 'en',
  },
})
