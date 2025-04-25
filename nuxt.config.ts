// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    'nuxt-icon'
  ],
  css: [
    '~/assets/css/main.css'
  ],
  app: {
    head: {
      title: 'UpClone - Find Work & Hire Talent',
      meta: [
        { name: 'description', content: 'Find the perfect freelancers for your project or find your next freelance opportunity' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { 
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
        }
      ]
    }
  },
  runtimeConfig: {
    public: {
      apiBase: '/api'
    }
  }
})