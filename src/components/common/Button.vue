<script setup lang="ts">
defineProps<{
  text: string
  type?: 'button' | 'submit' | 'reset'
  isLoading?: boolean
}>()

defineEmits(['click'])
</script>

<template>
  <button
    :disabled="isLoading"
    :type="type || 'button'"
    class="btn-primary"
    @click="$emit('click')"
  >
    <span
      :style="{ display: isLoading ? 'inline' : 'none' }"
      class="loading icon"
    />
    <span> {{ text }} </span>
  </button>
</template>

<style lang="scss" scoped>
button {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1rem;
  width: 7rem;
  max-width: 12rem;
}
</style>
