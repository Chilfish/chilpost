<script setup lang="ts">
definePageMeta({
  description: 'Explore Chilpost',
  showFAB: true,
})

useHead({
  title: 'Explore Chilpost', // reset while route changed
})
</script>

<template>
  <MainHeader />

  <PostInfinite post-type="explore" />
</template>

<style lang="scss" scoped>
@use "~/assets/index/main";
</style>
