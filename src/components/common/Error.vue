<script setup lang="ts">
import type { NuxtError } from 'nuxt/app'

const props = defineProps<{
  error: unknown
}>()

const _error = (props.error as NuxtError) ?? {
  statusCode: 500,
  message: 'Unknown Error',
}
</script>

<template>
  <div v-show="error" class="error">
    <p>
      {{ _error.statusCode }} /
      {{ _error.message }}
    </p>
  </div>
</template>
