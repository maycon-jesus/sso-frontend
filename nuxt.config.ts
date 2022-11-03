// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: true,
  css: [
    "vuetify/lib/styles/main.sass",
    "vue-toastification/dist/index.css",
    "assets/scss/global.scss",
  ],
  head:{
    link:[
      {
        rel:'stylesheet',
        href:'https://cdn.jsdelivr.net/npm/@mdi/font@6.9.96/css/materialdesignicons.min.css'
      }
    ]
  },
  build: {
    transpile: ["vuetify", "vue-toastification", "classnames"],
  },
  runtimeConfig: {
    public: {
      BASE_URL_API: process.env.NUXT_PUBLIC_BASE_URL_API,
    },
  },
});
