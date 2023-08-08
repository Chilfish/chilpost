<script setup lang="ts">
defineProps<{
  isLoading?: boolean
}>()
</script>

<template>
  <div class="loading-box">
    <span class="icon loading" />
  </div>
</template>
