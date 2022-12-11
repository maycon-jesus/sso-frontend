<template>
  <v-card>
    <template #title>
      <nuxt-img
        :src="`/assets/images/logo/logo-${
          theme.global.current.value.dark ? 'dark' : 'light'
        }.svg`"
        preload
        :style="{
          width: '100%',
        }"
      />
    </template>
    <v-container>
      <v-form
        v-model="formValid"
        :disabled="loading"
        @submit.prevent="onSubmit"
      >
        <v-row class="mb-2">
          <v-col cols="12">
            <h1 class="text-h4 text-center">
              Registrar
            </h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.firstName"
              label="Nome"
              autocomplete="given-name"
              name="firstName"
              :rules="[
                $validator.vuetifyValidator(
                  yup.string().required('Campo obrigatório!').max(200)
                ),
              ]"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.lastName"
              label="Sobrenome"
              autocomplete="family-name"
              name="lastName"
              :rules="[
                $validator.vuetifyValidator(
                  yup.string().required('Campo obrigatório!').max(200)
                ),
              ]"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="form.email"
              label="Email"
              autocomplete="email"
              inputmode="email"
              name="email"
              :rules="[$validator.presets.emailRequired]"
            />
          </v-col>
          <v-col cols="12">
            <CustomFormPasswordInput
              v-model="form.password"
              auto-complete="password"
              name="password"
              :rules="[$validator.presets.passwordRequired]"
            />
          </v-col>
          <v-col cols="12">
            <CustomFormPasswordInput
              v-model="form.passwordConfirm"
              label="Repita a sua senha"
              auto-complete="password"
              name="repeat-password"
              :rules="[
                $validator.presets.passwordRequired,
                validatePasswordsEquals,
              ]"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn
              block
              size="large"
              color="primary"
              type="submit"
              :loading="loading"
            >
              Registrar
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <span class="text-body-1">Já possui conta?
              <NuxtLink to="/" class="link-default">Entrar</NuxtLink>
            </span>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </v-card>
</template>

<script lang="ts" setup>
import { useToast } from 'vue-toastification'
import { useTheme } from 'vuetify'
import * as yup from 'yup'

const formValid = useState(() => false)
const form = useState(() => ({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: ''
}))
const loading = useState(() => false)
const $api = useApi()
const toast = useToast()
const router = useRouter()
const theme = useTheme()

const validatePasswordsEquals = () => {
  const passwordConfirm = form.value.passwordConfirm
  const password = form.value.password
  if (!passwordConfirm) { return 'Repita a sua senha!' }
  if (password !== passwordConfirm) { return 'As senhas não são iguais!' }
  return true
}

const onSubmit = () => {
  if (!formValid.value) { return }
  loading.value = true

  const nForm: Partial<typeof form.value> = { ...form.value }
  delete nForm.passwordConfirm

  $api
    .post<{
      token: string;
    }>('/auth/register', nForm)
    .then(() => {
      router.push('/')
      toast.success('Conta criada com sucesso!')
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      loading.value = false
    })
}
</script>
