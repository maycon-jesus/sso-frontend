<template>
  <v-row class="mt-2 mb-10">
    <v-col cols="12">
      <h1 class="text-h2 text-center">
        {{ props.title }}
      </h1>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>
