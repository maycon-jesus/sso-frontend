<template>
  <v-list-item>
    <v-list-item-title>{{ props.label }}</v-list-item-title>
    <v-list-item-subtitle>
      {{ value }}
    </v-list-item-subtitle>

    <template #append>
      <v-tooltip text="Copiar">
        <template #activator="{props:tooltipProps}">
          <v-btn variant="text" icon="mdi-content-copy" v-bind="tooltipProps" @click="copyValue" />
        </template>
      </v-tooltip>
    </template>
  </v-list-item>
</template>

<script lang="ts" setup>
import { useToast } from 'vue-toastification'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  modelValue: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])
const value = ref(props.modelValue)
const toast = useToast()

const copyValue = () => {
  navigator.clipboard.writeText(value.value)
  toast.success(`${props.label} copiado com sucesso!`)
}

watchEffect(() => {
  emits('update:modelValue', value)
})

watchEffect(() => {
  value.value = props.modelValue
})
</script>
