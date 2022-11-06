<template>
  <v-app-bar app>
    <v-btn
      class="ml-1"
      icon
      @click="loggedDrawer.open = !loggedDrawer.open"
    >
      <v-icon icon="mdi-menu" />
    </v-btn>

    <img
      :src="`/assets/images/logo/logo-${
        theme.global.current.value.dark ? 'dark' : 'light'
      }.svg`"
      :class="{
        [$style['image-logo']]: true,
        'ml-3': true,
      }"
    >

    <v-spacer />

    <client-only>
      <template #fallback>
        <div>
          <v-btn color="primary" icon class="mr-3">
            <v-avatar>
              <v-img :src="userStore.userData?.avatarUrl" />
            </v-avatar>
          </v-btn>
        </div>
      </template>

      <v-menu>
        <template #activator="{ props }">
          <div v-bind="props">
            <v-btn color="primary" icon class="mr-3">
              <v-avatar>
                <v-img :src="userStore.userData?.avatarUrl" />
              </v-avatar>
            </v-btn>
          </div>
        </template>

        <v-list nav>
          <v-btn color="red" @click="doLogout()">
            Sair
          </v-btn>
        </v-list>
      </v-menu>
    </client-only>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useTheme } from 'vuetify'
import { doLogout } from '~/composables/userData'
import { useUserStore } from '~~/store/user'
const loggedDrawer = useLoggedDrawer()
const userStore = useUserStore()
const theme = useTheme()
</script>

<style lang="scss" module>
.image-logo {
  width: auto;
  height: 80%;
}
</style>
