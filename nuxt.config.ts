// https://nuxt.com/docs/api/configuration/nuxt-config

let {STRAPI_URL} = require('./utils/env')
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['vuetify-nuxt-module', '@pinia/nuxt'], 
  app:{
    head: {
      script: [
        {
          src: `${STRAPI_URL}/plugins/strapi-stripe/static/stripe.js`,
          type: "text/javascript",
          defer: true,
        },
      ]
    }
  },
  ssr:false
})