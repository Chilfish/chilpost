<script setup lang="ts">
definePageMeta({
  title: 'Chilpost - home',
  description: 'Chilpost - home',
  middleware: ['user-only'],
})
</script>

<template>
  <MainHeader />

  <PostInfinite post-type="home" />
</template>

<style lang="scss" scoped>
@use "~/assets/index/main";
</style>
