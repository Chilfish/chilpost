<script setup lang="ts">
import { appName } from '~/constants'

definePageMeta({
  title: `${appName} - home`,
  description: `${appName} - home`,
  middleware: ['user-only'],
})

useHead({
  title: `${appName} - home`,
})
</script>

<template>
  <MainHeader />

  <PostInfinite post-type="home" />
</template>

<style lang="scss" scoped>
@use "~/assets/index/main";
</style>
