<template>
  <v-text-field
    label="Senha"
    v-model="value"
    :autocomplete="props.autoComplete"
    :name="props.name"
  ></v-text-field>
</template>

<script setup lang="ts">
const props = defineProps({
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
});
const emit = defineEmits(["update:modelValue"]);
const value = useState("CustomFormPasswordInput", () => props.modelValue);

watchEffect(() => {
  emit("update:modelValue", value.value);
});

watchEffect(() => {
  value.value = props.modelValue;
});
</script>
