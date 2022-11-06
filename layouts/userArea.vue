<template>
  <v-app>
    <TemplateHeader />
    <!-- Sizes your content based upon application components -->
    <v-navigation-drawer v-model="loggedDrawer.open">
      <v-list nav>
        <v-list-subheader title="Conta" />
        <v-list-item
          title="Informações Pessoais"
          to="/minha-conta"
          tag="NuxtLink"
        />
        <v-list-item
          title="Segurança"
          to="/minha-conta/seguranca"
          tag="NuxtLink"
        />
        <v-list-subheader title="Desenvolvedor" />
        <v-list-item
          title="Aplicativos"
          to="/desenvolvedor/aplicativos"
          tag="NuxtLink"
        />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <slot v-if="userStore.userData" />
    </v-main>

    <TemplateFooter />
  </v-app>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify/lib/framework.mjs'
import { useUserStore } from '~/store/user'

const display = useDisplay()
const loggedDrawer = useLoggedDrawer()
const userStore = useUserStore()

if (display.lgAndUp.value) {
  loggedDrawer.value.open = true
}

useAsyncData<any>(() =>
  userStore.getUserDataFetch()
)
</script>
