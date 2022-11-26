<template>
  <v-card>
    <v-card-title>Credenciais</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-list>
            <custom-list-item-copy v-model="appId" label="ClientId" />
            <custom-list-item-copy v-model="appSecretKey" label="Secret Key" />
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

const appId = ref(props.app.id)
const appSecretKey = ref(props.app.secretKey)
</script>
