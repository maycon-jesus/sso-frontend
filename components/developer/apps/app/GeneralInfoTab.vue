<template>
  <v-card>
    <v-card-title>Informações gerais</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-list>
            <v-list-item>
              <v-list-item-title>Nome</v-list-item-title>
              <v-list-item-subtitle>
                {{ props.app.name }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
const props = defineProps({
  app: {
    type: Object,
    required: true
  }
})
</script>
