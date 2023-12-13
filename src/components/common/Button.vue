<script setup lang="ts">
defineProps<{
  text: string
  type?: 'button' | 'submit' | 'reset'
  isLoading?: boolean
  level?: 'primary' | 'secondary' | 'danger'
}>()

defineEmits(['click'])
</script>

<template>
  <button
    :disabled="isLoading"
    :type="type || 'button'"
    class="btn-primary"
    :class="level ? `btn-${level}` : ''"
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
  width: 7rem;
  max-width: 12rem;
  padding: 0.6rem 1rem;
}

.btn-danger {
  color: #fff;
  background-color: var(--error);
}
</style>
