<template>
  <v-text-field
    :label="props.label || 'Senha'"
    v-model="value"
    :autocomplete="props.autoComplete"
    :name="props.name"
    :rules="props.rules"
  ></v-text-field>
</template>

<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
  },
  modelValue: {
    type: String,
    required: true,
  },
  autoComplete: {
    type: String,
  },
  name: {
    type: String,
  },
  rules: {
    type: Array,
    default: [],
  },
});
const emit = defineEmits(["update:modelValue"]);
const value = ref(props.modelValue);

watchEffect(() => {
  emit("update:modelValue", value.value);
});

watchEffect(() => {
  value.value = props.modelValue;
});
</script>
