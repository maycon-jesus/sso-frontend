<template>
  <div>Olá</div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "user-area",
  middleware: ["auth"],
});
</script>
