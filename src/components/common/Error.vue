<script setup lang="ts">
import type { NuxtError } from 'nuxt/app'

const props = defineProps<{
  error: unknown
}>()

const error = (props.error as NuxtError) ?? {
  statusCode: 500,
  message: 'Unknown Error',
}
</script>

<template>
  <div class="error">
    <p>
      {{ error.statusCode }} /
      {{ error.message }}
    </p>
  </div>
</template>
