<template>
  <v-card>
    <template v-slot:title>
      <v-img src="/assets/images/logo/logo-light.svg" />
    </template>
    <v-container>
      <v-form
        v-model="formValid"
        @submit.prevent="onSubmit"
        :disabled="loading"
      >
        <v-row>
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
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <CustomFormPasswordInput
              autoComplete="password"
              name="password"
              v-model="form.password"
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
      </v-form>
    </v-container>
  </v-card>
</template>

<script lang="ts" setup>
const value = useState("aaa", () => "");
const formValid = useState("aab", () => false);
const form = useState("aad", () => ({
  email: "",
  password: "",
}));
const loading = useState("aac", () => false);
const { $api } = useNuxtApp();
const authTokenCookie = useCookie("AUTH_TOKEN");
const router = useRouter();

const onSubmit = (a, b) => {
  if (!formValid.value) return;
  loading.value = true;
  $api
    .post<{
      token: string;
    }>("/auth/login", form.value)
    .then((res) => {
      authTokenCookie.value = res.data.token;
      router.push("/minha-conta");
    })
    .catch(() => {
      loading.value = false;
    });
};
</script>
