// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['vuetify-nuxt-module', '@pinia/nuxt'],
  runtimeConfig: {
    public:{
      strapiUrl: process.env.NUXT_STRAPI_URL,
    },
    strapiApiUrl: process.env.NUXT_STRAPI_API_URL,
    strapiTokenMusic: process.env.NUXT_STRAPI_TOKEN_MUSIC,
    strapiTokenUser: process.env.NUXT_STRAPI_TOKEN_USER,
    awsRegion: process.env.NUXT_AWS_REGION,
    awsMusicBucket: process.env.AWS_MUSIC_BUCKET,
    awsAccessKeyId: process.env.NUXT_AWS_ACCESS_KEY_ID,
    awsSecretAccesKey: process.env.NUXT_AWS_SECRET_ACCESS_KEY,
    strapiAdminApiToken: process.env.NUXT_STRAPI_ADMIN_API_TOKEN,
    stripeSecretKey: process.env.NUXT_STRIPE_SECRET_KEY
  }
})