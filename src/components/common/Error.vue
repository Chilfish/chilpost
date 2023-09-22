<script setup lang="ts">
import type { ErrorType } from '../../../server/error'

const props = defineProps<{
  error: unknown
}>()
const err = (props.error as ErrorType)
</script>

<template>
  <div class="error">
    {{ `${err.statusCode} / ${err.message}` }}
  </div>
</template>
