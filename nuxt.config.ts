// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['vuetify-nuxt-module', '@pinia/nuxt'],
  runtimeConfig: {
    strapiUrl: process.env.NUXT_STRAPI_URL,
    strapiApiUrl: process.env.NUXT_STRAPI_API_URL,
    strapiTokenMusic: process.env.NUXT_STRAPI_TOKEN_MUSIC,
    strapiTokenUser: process.env.NUXT_STRAPI_TOKEN_USER,
  }
})