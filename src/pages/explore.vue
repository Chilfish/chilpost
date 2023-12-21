<script setup lang="ts">
import type { PostDetail } from '~/types'

definePageMeta({
  description: 'Explore Chilpost',
  showFAB: true,
})

useHead({
  title: 'Explore Chilpost', // reset while route changed
})

const postStore = usePostStore()
const {
  data,
  pending,
  error,
} = useMyFetch<{ posts: PostDetail[] }>('/post/all', {
  query: {
    uid: useUserStore().curUser?.id,
  },
  server: false,
})

watch(data, () => {
  if (data.value?.data)
    postStore.posts = data.value.data.posts
}, { immediate: true })
</script>

<template>
  <MainHeader />

  <CommonLoading
    :error="error?.data"
    :is-loading="pending"
  />

  <PostList
    v-if="!pending"
    :posts="postStore.posts"
  />
</template>

<style lang="scss" scoped>
@use "~/assets/index/main";
</style>
