<template>
  <ClientOnly>
    <v-dialog v-model="modelValue" max-width="550">
      <CustomDialogCard title="Alterar senha">
        <v-form ref="formElement" v-model="formValid" @submit.prevent="onSubmit">
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <CustomFormPasswordInput v-model="form.currentPassword" auto-complete="current-password" label="Senha atual" :rules="[$validator.presets.stringRequired]" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <CustomFormPasswordInput v-model="form.newPassword" auto-complete="new-password" label="Senha nova" :rules="[$validator.presets.stringRequired, checkNewPasswordConfirmEqual(false)]" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <CustomFormPasswordInput v-model="form.newPasswordRepeat" auto-complete="new-password" label="Digite novamente a nova senha" :rules="[$validator.presets.stringRequired, checkNewPasswordConfirmEqual(true)]" />
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
              type="submit"
            >
              Salvar
            </v-btn>
          </v-card-actions>
        </v-form>
      </CustomDialogCard>
    </v-dialog>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { useToast } from 'vue-toastification'
import { VForm } from 'vuetify/lib/components/VForm/index'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])
const modelValue = useState(() => props.modelValue)
const form = useState(() => ({
  currentPassword: '',
  newPassword: '',
  newPasswordRepeat: ''
}))
const formValid = useState(() => false)
const loading = useState(() => false)
const { $api } = useNuxtApp()
const toast = useToast()
const formElement = ref<VForm|null>(null)

const checkNewPasswordConfirmEqual = (startCanBeEqual: Boolean) => {
  return () => {
    if (!startCanBeEqual && !form.value.newPasswordRepeat) { return true }
    const diferent = form.value.newPassword !== form.value.newPasswordRepeat
    const startEqual = form.value.newPassword.startsWith(form.value.newPasswordRepeat)
    const msgError = 'As senhas não são iguais!'
    if (diferent) {
      if (startCanBeEqual && startEqual) { return true }
      return msgError
    } else { return true }
  }
}

const resetForm = () => {
  form.value.currentPassword = ''
  form.value.newPassword = ''
  form.value.newPasswordRepeat = ''
}

const onSubmit = () => {
  formElement.value?.validate()
  if (!formValid.value) { return }
  loading.value = true
  const { currentPassword, newPassword } = form.value
  $api
    .post('/users/me/security/password', { oldPassword: currentPassword, newPassword })
    .then(() => {
      toast.success('Senha alterada')
      modelValue.value = false
      resetForm()
    })
    .catch((err) => {
      toast.error(`${err.response?.data?.message || err.message}`)
    })
    .finally(() => {
      loading.value = false
    })
}

watchEffect(() => {
  emits('update:modelValue', modelValue.value)
})

watchEffect(() => {
  modelValue.value = props.modelValue
})
</script>
