<script setup lang="ts">
import type { NuxtError } from 'nuxt/app'

defineProps<{
  error: NuxtError
}>()
</script>

<template>
  <div class="error">
    <p>
      {{ error.statusCode }} /
      {{ error.message }}
    </p>
  </div>
</template>
