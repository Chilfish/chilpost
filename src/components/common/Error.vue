<script setup lang="ts">
import type { NuxtError } from 'nuxt/app'

const props = defineProps<{
  error: unknown
}>()
const err = (props.error as NuxtError)
</script>

<template>
  <div class="error">
    {{ `${err.statusCode} / ${err.statusMessage}` }}
  </div>
</template>
