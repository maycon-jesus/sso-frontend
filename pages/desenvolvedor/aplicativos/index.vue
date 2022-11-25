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
    <v-row>
      <v-col
        v-for="app in applicationsStore.applications"
        :key="app.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card>
          <v-card-title>{{ app.name }}</v-card-title>
          <v-card-actions>
            <v-btn
              append-icon="mdi-chevron-right"
              tag="NuxtLink"
              :to="{
                name: 'app',
                params:{
                  appId: app.id
                }
              }"
            >
              Configurar
            </v-btn>
          </v-card-actions>
        </v-card>
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
