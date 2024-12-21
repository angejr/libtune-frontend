// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['vuetify-nuxt-module', '@pinia/nuxt', 'nuxt-gtag', '@nuxtjs/seo'],
  gtag: {
    id: 'G-FJQG9Y2J4L',
    enabled: process.env.NODE_ENV === 'production'
  },
  ssr: true,
  nitro: {
    compressPublicAssets: { brotli: true, gzip: true },
  },
  app:{
    head:{
      title: "",
      titleTemplate: '%s'
    }
  },
  // app:{
  //   head:{
  //     script: [
  //       {
  //         src: "https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css",
  //         async: true
  //       }
  //     ]
  //   }
  // },
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
    awsSecretAccessKey: process.env.NUXT_AWS_SECRET_ACCESS_KEY,
    strapiAdminApiToken: process.env.NUXT_STRAPI_ADMIN_API_TOKEN,
    stripeSecretKey: process.env.NUXT_STRIPE_SECRET_KEY
  }
})