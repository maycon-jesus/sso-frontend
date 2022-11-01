<template>
  <v-card>
    <template v-slot:title>
      <v-img
        :src="`/assets/images/logo/logo-${
          theme.global.current.value.dark ? 'dark' : 'light'
        }.svg`"
      />
    </template>
    <v-container>
      <v-form
        v-model="formValid"
        @submit.prevent="onSubmit"
        :disabled="loading"
      >
        <v-row class="mb-2">
          <v-col cols="12">
            <h1 class="text-h4 text-center">Registrar</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              label="Nome"
              autocomplete="given-name"
              name="firstName"
              v-model="form.firstName"
              :rules="[
                $validator.vuetifyValidator(
                  yup.string().required('Campo obrigatório!').max(200)
                ),
              ]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Sobrenome"
              autocomplete="family-name"
              name="lastName"
              v-model="form.lastName"
              :rules="[
                $validator.vuetifyValidator(
                  yup.string().required('Campo obrigatório!').max(200)
                ),
              ]"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Email"
              autocomplete="email"
              inputmode="email"
              name="email"
              v-model="form.email"
              :rules="[$validator.presets.emailRequired]"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <CustomFormPasswordInput
              autoComplete="password"
              name="password"
              v-model="form.password"
              :rules="[$validator.presets.passwordRequired]"
            />
          </v-col>
          <v-col cols="12">
            <CustomFormPasswordInput
              label="Repita a sua senha"
              autoComplete="password"
              name="password"
              v-model="form.passwordConfirm"
              :rules="[
                $validator.presets.passwordRequired,
                validatePasswordsEquals,
              ]"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12"
            ><v-btn
              block
              size="large"
              color="primary"
              type="submit"
              :loading="loading"
              >Registrar</v-btn
            ></v-col
          >
        </v-row>
        <v-row>
          <v-col cols="12">
            <span class="text-body-1"
              >Já possui conta?
              <NuxtLink to="/" class="link-default">Entrar</NuxtLink>
            </span>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </v-card>
</template>

<script lang="ts" setup>
import { useToast } from "vue-toastification";
import { useTheme } from "vuetify";
import * as yup from "yup";

const formValid = useState(() => false);
const form = useState(() => ({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirm: "",
}));
const loading = useState(() => false);
const { $api } = useNuxtApp();
const toast = useToast();
const router = useRouter();
const theme = useTheme();

const validatePasswordsEquals = () => {
  const passwordConfirm = form.value.passwordConfirm;
  const password = form.value.password;
  if (!passwordConfirm) return "Repita a sua senha!";
  if (password !== passwordConfirm) return "As senhas não são iguais!";
  return true;
};

const onSubmit = () => {
  if (!formValid.value) return;
  loading.value = true;

  const nForm = { ...form.value };
  delete nForm.passwordConfirm;

  $api
    .post<{
      token: string;
    }>("/register", nForm)
    .then(() => {
      router.push("/");
      toast.success("Conta criada com sucesso!");
    })
    .catch(() => {
      loading.value = false;
    });
};
</script>
