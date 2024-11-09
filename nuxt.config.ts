// https://nuxt.com/docs/api/configuration/nuxt-config

let {STRAPI_URL} = require('./utils/env')
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['vuetify-nuxt-module', '@pinia/nuxt']
})