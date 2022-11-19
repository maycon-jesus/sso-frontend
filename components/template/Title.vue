<template>
  <v-row class="mt-2 mb-5">
    <v-col cols="12">
      <h1 class="text-h2 text-center">
        {{ props.title }}
      </h1>
    </v-col>
    <v-col v-if="props.subtitle" cols="12">
      <p class="text-h5 text-center">
        {{ props.subtitle }}
      </p>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: false,
    default: () => null
  }
})
</script>
