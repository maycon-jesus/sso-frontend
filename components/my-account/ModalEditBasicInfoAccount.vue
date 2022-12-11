<template>
  <client-only>
    <v-dialog v-model="modelValue" max-width="550">
      <custom-dialog-card title="Editar informações básicas" @on-close="modelValue = false">
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="form.firstName" label="Nome" :rules="[$validator.presets.stringRequired]" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="form.lastName" label="Sobrenome" :rules="[$validator.presets.stringRequired]" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            variant="elevated"
            color="success"
            prepend-icon="mdi-content-save"
            :loading="loading"
            @click="saveForm()"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </custom-dialog-card>
    </v-dialog>
  </client-only>
</template>

<script lang="ts" setup>
import { useToast } from 'vue-toastification'
import { useUserStore } from '~~/store/user'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])
const $api = useApi()
const modelValue = useState(() => props.modelValue)
const toast = useToast()
const userStore = useUserStore()
const loading = useState(() => false)
const form = useState(() => ({
  firstName: userStore.userData.firstName,
  lastName: userStore.userData.lastName
}))

const resetForm = () => {
  form.value.firstName = userStore.userData.firstName
  form.value.lastName = userStore.userData.lastName
}

const saveForm = () => {
  loading.value = true
  $api.patch('/users/me/basic', form.value)
    .then(() => {
      toast.success('Alterações salvas com sucesso!')
      modelValue.value = false
      userStore.getUserData()
    })
    .catch((err) => {
      console.error(err)
      toast.error(err.response ? err.response.data.message : err.message)
    })
    .finally(() => {
      loading.value = false
    })
}

watch(modelValue, () => {
  resetForm()
})

watchEffect(() => {
  emits('update:modelValue', modelValue)
})

watchEffect(() => {
  modelValue.value = props.modelValue
})

</script>
