<template>
  <div :class="$style.main">
    <AuthLoginCard :class="$style['card-login']"/>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "clean",
});
</script>

<style module lang="scss">
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.card-login {
  width: 500px;
}
</style>
