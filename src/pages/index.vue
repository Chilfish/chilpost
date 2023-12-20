<script setup lang="ts">
import type { PostDetail } from '~/types'

definePageMeta({
  description: 'Explore Chilpost',
  showFAB: true,
  alias: '/explore',
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

  <CommonLoading :error="error?.data" :is-loading="pending" />

  <main v-if="!pending">
    <h3
      v-if="postStore.posts.length === 0"
      class="error"
    >
      No Post Yet
    </h3>
    <section
      v-for="item in postStore.posts"
      :key="item.id"
    >
      <PostItem
        :post="item"
        :owner="item.owner"
        :is-liked="item.is_liked"
      />
    </section>
  </main>
</template>

<style lang="scss" scoped>
@use "~/assets/index/main";
</style>
