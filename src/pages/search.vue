<script setup lang="ts">
const postStore = usePostStore()
</script>

<template>
  <MainHeader />
  <PostList :posts="postStore.searchPosts" />
</template>
