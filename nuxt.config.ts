// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    css: ['vuetify/lib/styles/main.sass', 'assets/scss/global.scss'],
    build:{
        transpile: ['vuetify']
    },
    runtimeConfig:{
        public:{
            BASE_URL_API: process.env.NUXT_PUBLIC_BASE_URL_API
        }
    }
})
