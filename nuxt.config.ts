// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: true,
  css: [
    "assets/scss/global.scss",
  ],
  app: {
    head: {
      link: [
        {
          rel: 'preload',
          href: 'https://cdn.jsdelivr.net/npm/vue-toastification@2.0.0-rc.5/dist/index.css',
          crossorigin: '',
          
        },
        {
          rel: "stylesheet",
          href: 'https://cdnjs.cloudflare.com/ajax/libs/vuetify/3.0.0/vuetify.css',
          crossorigin: ''
        },
        {
          rel: "preload",
          href: "https://cdn.jsdelivr.net/npm/@mdi/font@6.9.96/css/materialdesignicons.min.css",
          crossorigin: "",
        },
      ],
    },
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
