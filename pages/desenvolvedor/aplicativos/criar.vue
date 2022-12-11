<template>
  <v-container>
    <v-row>
      <v-col cols="auto">
        <v-btn variant="text" prepend-icon="mdi-chevron-left" :disabled="form.state.loading" @click="router.back()">
          Voltar
        </v-btn>
      </v-col>
    </v-row>
    <template-title title="Criar aplicativo" />
    <v-form v-model="form.state.valid" :disabled="form.state.loading" @submit.prevent="onSubmit">
      <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-text-field v-model="form.data.name" label="Nome" :rules="[$validator.presets.stringRequired]" />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="auto">
          <v-btn size="large" type="submit" :loading="form.state.loading">
            Criar
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script lang="ts" setup>
import { useToast } from 'vue-toastification'

definePageMeta({
  layout: 'user-area',
  name: 'app-create'
})

const $api = useApi()
const toast = useToast()
const router = useRouter()
const form = useState(() => ({
  data: {
    name: ''
  },
  state: {
    loading: false,
    valid: false
  }
}))

const onSubmit = () => {
  if (!form.value.state.valid) { return }
  form.value.state.loading = true

  $api.post<{
    id: string
  }>('/users/me/applications', form.value.data)
    .then((app) => {
      toast.success('Aplicativo criado com sucesso!')
      router.push({
        name: 'app',
        params: {
          appId: app.data.id
        }
      })
    })
    .catch((err) => {
      toast.error(err.response ? err.response.data.message : err.message)
    })
    .finally(() => {
      form.value.state.loading = false
    })
}
</script>
