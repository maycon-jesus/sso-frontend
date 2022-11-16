<template>
  <v-text-field
    v-model="value"
    :label="props.label || 'Senha'"
    :autocomplete="props.autoComplete"
    :name="props.name"
    :rules="props.rules"
  />
</template>

<script setup lang="ts">
import { PropType } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: undefined
  },
  modelValue: {
    type: String,
    required: true
  },
  autoComplete: {
    type: String,
    default: undefined
  },
  name: {
    type: String,
    default: undefined
  },
  rules: {
    type: Array as PropType<any>,
    default: () => ([])
  }
})
const emit = defineEmits(['update:modelValue'])
const value = ref(props.modelValue)

watchEffect(() => {
  emit('update:modelValue', value.value)
})

watchEffect(() => {
  value.value = props.modelValue
})
</script>
