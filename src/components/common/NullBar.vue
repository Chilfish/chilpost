<script setup lang="ts">
defineProps<{
  message: string
}>()
</script>

<template>
  <div
    class="error mt-0 h-14 center rounded-lg font-bold"
    bg="light-7 dark:dark-7"
  >
    {{ message }}
  </div>
</template>
