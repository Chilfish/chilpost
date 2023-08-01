<script setup lang="ts">
import { posts } from '~/mock'
</script>

<template>
  <PostItem v-for="post in posts" :key="post.id" :post="post" />
</template>

<style lang="scss" scoped>

</style>
