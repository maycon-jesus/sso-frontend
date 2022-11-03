<template>
  <v-card>
    <template v-slot:title>
      <nuxt-img
        :src="`/assets/images/logo/logo-${
          theme.global.current.value.dark ? 'dark' : 'light'
        }.svg`"
        preload
        :style="{
          width: '100%',
        }"
      ></nuxt-img>
    </template>
    <v-container>
      <v-form
        v-model="formValid"
        @submit.prevent="onSubmit"
        :disabled="loading"
      >
        <v-row class="mb-2">
          <v-col cols="12">
            <h1 class="text-h4 text-center">Entrar</h1>
          </v-col>
        </v-row>
        <v-row>
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
        </v-row>
        <v-row>
          <v-col cols="12"
            ><v-btn
              block
              size="large"
              color="primary"
              type="submit"
              :loading="loading"
              >Entrar</v-btn
            ></v-col
          >
        </v-row>
        <v-row>
          <v-col cols="12">
            <span class="text-body-1"
              >Não possui conta?
              <NuxtLink to="/registrar" class="link-default"
                >Criar conta</NuxtLink
              >
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

const formValid = useState(() => false);
const form = useState(() => ({
  email: "",
  password: "",
}));
const loading = useState(() => false);
const { $api } = useNuxtApp();
const toast = useToast();
const authTokenCookie = useCookie("AUTH_TOKEN");
const router = useRouter();
const theme = useTheme();

const onSubmit = () => {
  if (!formValid.value) return;
  loading.value = true;
  $api
    .post<{
      token: string;
    }>("/auth/login", form.value)
    .then((res) => {
      authTokenCookie.value = res.data.token;
      router.push("/minha-conta");
      toast.success("Autenticação feita com sucesso!");
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>
