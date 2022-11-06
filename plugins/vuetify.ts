import { createVuetify } from 'vuetify'
import 'vuetify/styles'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { md3 } from 'vuetify/blueprints/md3'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    blueprint: md3,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi
      }
    },
    theme: {
      defaultTheme: 'default',
      themes: {
        default: {
          dark: false,
          colors: {
            primary: '#D72323',
            secondary: '#F56217'
          },
          variables: {
            'theme-background': '#ecf0f1',
            'theme-surface': '#fff'
          }
        },
        dark: {
          dark: true,
          colors: {
            primary: '#D72323',
            secondary: '#F56217'
          }
        }
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)
})
