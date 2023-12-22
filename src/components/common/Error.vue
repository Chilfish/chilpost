<script setup lang="ts">
import type { ErrorCode, ErrorType } from '~/types'

const {
  error,
  errorCode,
} = defineProps<{
  error: unknown
  errorCode?: ErrorCode
}>()

const err = computed(() => {
  if (errorCode)
    return newError(errorCode)
  return error as ErrorType
})
</script>

<template>
  <div
    v-if="err.statusCode >= 400"
    class="error"
  >
    <!-- {{ err }} | {{ errorCode }} -->
    {{ `${err.statusCode} / ${err.message}` }}
  </div>
</template>
