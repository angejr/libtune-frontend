// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  vite: {
    server: {
      allowedHosts: ['.ngrok-free.app'],
    },
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['vuetify-nuxt-module', '@pinia/nuxt', 'nuxt-gtag', '@nuxtjs/seo', '@nuxtjs/sitemap', '@nuxtjs/robots', '@nuxtjs/i18n', 'nuxt-clarity-analytics'],
  site: {
    url: 'https://libtune.com',
  },
  robots: {
    blockNonSeoBots: true,
    disallow: ['/api']
  },
  gtag: {
    enabled: process.env.NODE_ENV === 'production',
    tags: [
      {
        id: 'G-FJQG9Y2J4L',
      },
      {
        id: 'AW-16862883963'
      }
    ]
  },
  ssr: true,
  nitro: {
    compressPublicAssets: { brotli: true, gzip: true },
  },
  i18n: {
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: false,
      fallbackLocale: 'en',
      redirectOn: 'all'
    },
    strategy: 'prefix_except_default',
    locales: [
    { code: 'en', name: 'English', file: 'en.json' },
    { code: 'es', name: 'Español', file: 'es.json' },
  ],
    defaultLocale: 'en',
  },
  app: {
    head: {
      title: "",
      titleTemplate: '%s',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: "preconnect", href: "https://fonts.googleapis.com", crossorigin: "" },
        { rel: "preconnect", href: "https://fonts.gstatic.com" },
        { href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap", rel: "stylesheet" }
      ]
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
    public: {
      strapiUrl: process.env.NUXT_STRAPI_URL,
      stripeSPublicKey: process.env.NUXT_STRIPE_PUBLIC_KEY
    },
    strapiApiUrl: process.env.NUXT_STRAPI_API_URL,
    strapiTokenMusic: process.env.NUXT_STRAPI_TOKEN_MUSIC,
    strapiTokenUser: process.env.NUXT_STRAPI_TOKEN_USER,
    strapiTokenLead: process.env.NUXT_STRAPI_TOKEN_LEAD,
    awsRegion: process.env.NUXT_AWS_REGION,
    awsMusicBucket: process.env.AWS_MUSIC_BUCKET,
    awsAccessKeyId: process.env.NUXT_AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.NUXT_AWS_SECRET_ACCESS_KEY,
    strapiAdminApiToken: process.env.NUXT_STRAPI_ADMIN_API_TOKEN,
    stripeSecretKey: process.env.NUXT_STRIPE_SECRET_KEY
  }
})