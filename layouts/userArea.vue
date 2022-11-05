<template>
  <v-app>
    <TemplateHeader />
    <!-- Sizes your content based upon application components -->
    <v-navigation-drawer v-model="loggedDrawer.open">
      <v-list nav>
        <v-list-subheader title="Conta" />
        <v-list-item
          title="Informações Pessoais"
          to="/minha-conta"
          tag="NuxtLink"
        />
        <v-list-item
          title="Segurança"
          to="/minha-conta/seguranca"
          tag="NuxtLink"
        />
        <v-list-subheader title="Desenvolvedor" />
        <v-list-item
          title="Aplicativos"
          to="/desenvolvedor/aplicativos"
          tag="NuxtLink"
        />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <slot v-if="userData" />
    </v-main>

    <TemplateFooter />
  </v-app>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify/lib/framework.mjs";
import { $apiFetch } from "~~/helpers/api";

const display = useDisplay();
const userData = useUserData();
const loggedDrawer = useLoggedDrawer();

if (display.lgAndUp.value) {
  loggedDrawer.value.open = true;
}

const me = useAsyncData<any>(async () =>
  $apiFetch({
    path: "/users/me",
  })
);

watchEffect(() => {
  userData.value = me.data.value;
  if (userData.value) {
    userData.value.avatarUrl = `https://www.gravatar.com/avatar/${userData.value.avatarUrl}?s=32&d=identicon`;
  }
});
</script>
