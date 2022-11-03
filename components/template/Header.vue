<template>
  <v-app-bar app>
    <img
      :src="`/assets/images/logo/logo-${
        theme.global.current.value.dark ? 'dark' : 'light'
      }.svg`"
      :class="{
        [$style['image-logo']]: true,
        'ml-3': true,
      }"
    />

    <v-spacer></v-spacer>

    <client-only>
      <template #fallback>
        <div>
          <v-btn color="primary" icon class="mr-3">
            <v-avatar>
              <v-img :src="userData?.avatarUrl"></v-img>
            </v-avatar>
          </v-btn>
        </div>
      </template>

      <v-menu>
        <template v-slot:activator="{ props }">
          <div v-bind="props">
            <v-btn color="primary" icon class="mr-3">
              <v-avatar>
                <v-img :src="userData?.avatarUrl"></v-img>
              </v-avatar>
            </v-btn>
          </div>
        </template>

        <v-list nav>
          <v-btn color="red" @click="doLogout()">Sair</v-btn>
        </v-list>
      </v-menu>
    </client-only>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { doLogout } from "~/composables/userData";
import { useTheme } from "vuetify";

const userData = useUserData();
const theme = useTheme();
</script>

<style lang="scss" module>
.image-logo {
  width: auto;
  height: 80%;
}
</style>
