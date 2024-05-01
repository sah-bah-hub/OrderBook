// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
      head: {
          title: 'Order Book',
          meta: [
              { charset: 'utf-8' },
              { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          ],
      }
  },
  css: ['~/assets/styles/main.scss'],
  ssr: true,
  modules: [
    "vuetify-nuxt-module",
    '@pinia/nuxt',
  ]
})