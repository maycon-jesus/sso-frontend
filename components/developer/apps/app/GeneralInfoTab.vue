<template>
  <v-card>
    <v-card-title>Informações gerais</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-list>
            <custom-list-item-editor v-model="applicationsStore.currentApp.name" label="Nome" :on-save="saveChanges" />
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { useApplicationsStore } from '~~/store/applications'
const { $api } = useNuxtApp()
const applicationsStore = useApplicationsStore()

const saveChanges = () => {
  return new Promise((resolve) => {
    $api.post(`/users/me/applications/${applicationsStore.currentApp.id}`, {
      name: applicationsStore.currentApp.name
    })
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        resolve({})
      })
  })
}

// const props = defineProps({
//   app: {
//     type: Object,
//     required: true
//   }
// })

</script>
