<template>
  <div :class="$style.container">
    <v-container>
      <template-title title="Minha conta" />
      <v-row justify="center">
        <v-col cols="auto">
          <v-card :class="$style.card">
            <v-card-title>Foto de perfil</v-card-title>
            <v-card-text>
              <v-row justify="center">
                <v-col cols="auto">
                  <v-avatar size="100">
                    <nuxt-img height="100" width="100" :src="userStore.userData.avatarUrl" preload alt="Sua foto de perfil" />
                  </v-avatar>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn prepend-icon="mdi-pencil" href="https://br.gravatar.com/" target="_blank">
                Alterar foto de perfil
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="auto">
          <v-card :class="$style.card">
            <v-card-title>
              Informações da conta
            </v-card-title>
            <v-card-text>
              <v-list class="py-0">
                <v-list-item title="Nome" :subtitle="userStore.userData.firstName" />
                <v-list-item title="Sobrenome" :subtitle="userStore.userData.lastName" />
              </v-list>
            </v-card-text>
            <v-card-actions>
              <v-btn prepend-icon="mdi-pencil" @click="modalEditOpen=true">
                Editar
              </v-btn>
            </v-card-actions>
            <my-account-modal-edit-basic-info-account v-model="modalEditOpen" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '~~/store/user'

definePageMeta({
  layout: 'user-area',
  middleware: ['auth']
})

const userStore = useUserStore()
const modalEditOpen = useState(() => false)
</script>

<style module lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 25px;

  .card{
    width: 500px;
    max-width: 100%;
  }
}
</style>
