<template>
  <v-card>
    <slot name="title">
      <v-card-title v-if="props.title" :class="$style['card-title']">
        {{ props.title }}

        <ClientOnly>
          <template #fallback>
            <v-btn :class="$style['btn-close']" icon="mdi-close" variant="text" @click="emits('onClose')" />
          </template>

          <v-tooltip>
            <template #activator="{props}">
              <v-btn v-bind="props" :class="$style['btn-close']" icon="mdi-close" variant="text" @click="emits('onClose')" />
            </template>
            Fechar
          </v-tooltip>
        </ClientOnly>
      </v-card-title>
      <v-divider v-if="props.title" />
    </slot>
    <slot />
  </v-card>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    required: false,
    default: () => null
  }
})
const emits = defineEmits(['onClose'])
</script>

<style lang="scss" module>
.card-title{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;

    .btn-close{
        margin-left: auto;
    }
}
</style>
