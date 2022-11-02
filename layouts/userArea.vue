<template>
  <v-app>
    <TemplateHeader />
    <!-- Sizes your content based upon application components -->
    <v-main>
      <slot v-if="userData" />
    </v-main>

    <v-footer
      :elevation="4"
      :style="{
        flex: 0,
      }"
    >
      Footer
    </v-footer>
  </v-app>
</template>

<script lang="ts" setup>
import { $apiFetch } from "~~/helpers/api";
const userData = useUserData();

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
