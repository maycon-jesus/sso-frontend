<template>
  <v-list-item>
    <v-list-item-title>{{ props.label }}</v-list-item-title>
    <v-list-item-subtitle v-if="!editorMode">
      {{ value }}
    </v-list-item-subtitle>
    <v-expand-transition>
      <v-container v-show="editorMode">
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="value" :disabled="saving" :loading="saving" />
          </v-col>
        </v-row>
        <v-row justify="end">
          <v-col cols="auto">
            <v-btn variant="text" :disabled="saving" @click="cancelEditorMode">
              Cancelar
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn :loading="saving" @click="saveChanges">
              Salvar
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-expand-transition>

    <template v-if="!editorMode" #append>
      <v-tooltip text="Editar">
        <template #activator="{props:tooltipProps}">
          <v-btn variant="text" icon="mdi-pencil" v-bind="tooltipProps" @click="toggleEditorMode" />
        </template>
      </v-tooltip>
    </template>
  </v-list-item>
</template>

<script lang="ts" setup>
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  modelValue: {
    type: String,
    required: true
  },
  onSave: {
    type: Function,
    required: false,
    default: null
  }
})
const emits = defineEmits(['update:modelValue'])
const value = ref(props.modelValue)
const saving = ref(false)
const editorMode = ref(false)

const toggleEditorMode = () => { editorMode.value = !editorMode.value }

const cancelEditorMode = () => {
  editorMode.value = false
  value.value = props.modelValue
}

const saveChanges = () => {
  emits('update:modelValue', value.value)
  if (!props.onSave) { editorMode.value = false } else {
    saving.value = true
    props.onSave()
      .then(() => {
        editorMode.value = false
      })
      .catch(() => {})
      .finally(() => {
        saving.value = false
      })
  }
}

watchEffect(() => {
  value.value = props.modelValue
})
</script>
