<template>
  <div :class="$style.main">
    <AuthRegisterCard :class="$style['card-register']" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'clean'
})
</script>

<style module lang="scss">
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.card-register {
  width: 500px;
}
</style>
