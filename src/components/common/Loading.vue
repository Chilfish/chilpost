<script setup lang="ts">
import type { ErrorCode } from '~/types'

defineProps<{
  isLoading?: boolean
  error?: unknown
  errorCode?: ErrorCode
}>()
</script>

<template>
  <div v-show="isLoading" class="loading-box">
    <span class="loading icon" />
  </div>
  <CommonError
    v-if="error"
    :error="error"
    :error-code="errorCode"
  />
</template>
