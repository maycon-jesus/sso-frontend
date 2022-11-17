import vuetify from 'vite-plugin-vuetify'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: true,
  css: ['assets/scss/global.scss'],
  app: {
    head: {
      link: [
        {
          rel: 'preconnect',
          href: 'https://cdnjs.cloudflare.com'
        },
        {
          rel: 'preconnect',
          href: 'https://cdn.jsdelivr.net'
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/vue-toastification@2.0.0-rc.5/dist/index.css',
          crossorigin: '',
          media: 'none',
          onload: "if(media!='all')media='all'"
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/@mdi/font@6.9.96/css/materialdesignicons.min.css',
          crossorigin: '',
          media: 'none',
          onload: "if(media!='all')media='all'"
        }
      ]
    }
  },
  modules: [
    '@nuxt/image-edge',
    ['@pinia/nuxt', {
      autoImports: [
        'defineStore'
      ]
    }],
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins?.push(vuetify())
      })
    },
    'nuxt-purgecss'
  ],
  build: {
    transpile: ['vuetify', 'vue-toastification', 'classnames']
  },
  vite: {
    ssr: {
      noExternal: ['vuetify']
    },
    define: {
      'process.env.DEBUG': false
    }
  },
  runtimeConfig: {
    public: {
      BASE_URL_API: process.env.NUXT_PUBLIC_BASE_URL_API
    }
  }
})
