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
} = useMyFetch<PostDetail[]>('/post')

watchEffect(() => {
  if (data.value?.data)
    postStore.posts = data.value.data

  useErrorTitle(error.value?.data)
})
</script>

<template>
  <MainHeader />

  <CommonLoading :error="error?.data" :is-loading="pending" />
  <main v-if="data">
    <section
      v-for="item in postStore.bodyPosts"
      :key="item.post.id"
    >
      <PostItem
        :post="item.post"
        :owner="item.owner"
      />
    </section>
  </main>
</template>

<style lang="scss" scoped>
@use "~/assets/index/main";
</style>
