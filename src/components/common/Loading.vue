<script setup lang="ts">
defineProps<{
  isLoading?: boolean
  error?: unknown
}>()
</script>

<template>
  <div v-show="isLoading" class="loading-box">
    <span class="loading icon" />
  </div>
  <CommonError v-if="error" :error="error" />
</template>
