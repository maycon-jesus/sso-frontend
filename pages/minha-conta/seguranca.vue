<template>
  <v-container>
    <lazy-my-account-modal-change-password v-model="modalChangePasswordOpen" />

    <template-title title="Segurança" />

    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card>
          <v-card-title>Iniciar sessão</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-ripple title="Alterar senha" append-icon="mdi-chevron-right" @click="modalChangePasswordOpen=true" />
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>

definePageMeta({
  layout: 'user-area'
})

const modalChangePasswordOpen = useState(() => false)
</script>
