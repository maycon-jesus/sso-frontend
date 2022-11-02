// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: [
    "vuetify/lib/styles/main.sass",
    "vue-toastification/dist/index.css",
    "assets/scss/global.scss",
  ],
  build: {
    transpile: ["vuetify", "vue-toastification", "classnames"],
  },
  runtimeConfig: {
    public: {
      BASE_URL_API: process.env.NUXT_PUBLIC_BASE_URL_API,
    },
  },
});
