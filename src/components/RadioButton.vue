<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String
  },
  name: {
    type: String,
    required: false
  },
  value: {
    type: String,
    required: false,
    default: 'yes'
  }
})
const emit = defineEmits(['update:modelValue'])
function emitValue() {
  emit('update:modelValue', props.value)
}
const idGenerator = Math.random().toString(36).slice(2)
</script>
<template>
  <div class="flex items-center">
    <input :id="idGenerator" :name="props.name" :value="props.modelValue" @click="emitValue"
      :checked="props.modelValue === props.value" type="radio"
      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
    <label :for="idGenerator" class="ml-3 block text-sm  leading-6 text-gray-800">
      <slot></slot>
    </label>
  </div>
</template>

<style scoped></style>
