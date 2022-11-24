<template>
  <v-container>
    <template-title title="Aplicativos" subtitle="Aplicativos são um forma de conectar suas aplicações com o SSO" />

    <v-row justify="end">
      <v-col cols="auto">
        <v-btn :to="{name: 'app-create'}" tag="NuxtLink">
          Criar aplicativo
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useApplicationsStore } from '~/store/applications'

definePageMeta({
  layout: 'user-area',
  name: 'apps'
})

const applicationsStore = useApplicationsStore()

useAsyncData(() => applicationsStore.getApplicationsFetch())
</script>
