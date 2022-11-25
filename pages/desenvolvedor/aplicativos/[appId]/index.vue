<template>
  <v-container>
    <template-title :title="app.data.value?.name||'${APP_NAME}'" />
    <v-row>
      <v-col cols="12" md="4" lg="3">
        <v-tabs v-model="currentTab" direction="vertical">
          <v-tab v-for="tab in tabs" :key="tab.value" :value="tab.value">
            {{ tab.title }}
          </v-tab>
        </v-tabs>
      </v-col>
      <v-col cols="12" md="8" lg="9">
        <v-window v-model="currentTab" direction="vertical">
          <v-window-item v-for="tab in tabs" :key="tab.value" :value="tab.value">
            <component :is="tab.component" />
          </v-window-item>
        </v-window>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useApplicationsStore } from '~~/store/applications'
const GeneralInfoTab = resolveComponent('developer-apps-app-general-info-tab')
const CredentialsTab = resolveComponent('developer-apps-app-credentials-tab')
const AuthorizationsListTab = resolveComponent('developer-apps-app-authorizations-list-tab')

definePageMeta({
  layout: 'user-area',
  name: 'app'
})

const route = useRoute()
const applicationsStore = useApplicationsStore()
const tabs = [
  {
    title: 'Informações gerais',
    value: 'informacoes-gerais',
    component: GeneralInfoTab
  },
  {
    title: 'Credenciais',
    value: 'credenciais',
    component: CredentialsTab
  },
  {
    title: 'Lista de autorizações',
    value: 'lista-de-autorizacoes',
    component: AuthorizationsListTab
  }
]
const currentTab = useState(() => '')

onMounted(() => {
  currentTab.value = tabs[0].value
})

const app = useAsyncData(() => applicationsStore.getApplicationFetch(route.params.appId.toString()))
</script>
