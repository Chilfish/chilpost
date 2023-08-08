<script setup lang="ts">
defineProps<{
  isLoading?: boolean
}>()
</script>

<template>
  <div v-if="isLoading" class="loading-box">
    <span class="icon loading" />
  </div>
</template>
