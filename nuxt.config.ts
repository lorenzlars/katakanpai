import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: [
    '@vueuse/nuxt',
    '@nuxt/ui',
  ],
  app: {
    head: {
      title: 'Katakanpai',
      meta: [
        { name: 'description', content: 'A fun drinking game where you guess brand names from katakana characters. Test your Japanese reading skills and enjoy with friends!' }
      ]
    }
  }
})
