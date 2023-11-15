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
} = useMyFetch<{ posts: PostDetail[] }>('/post/all', { server: false })

watch(data, () => {
  if (data.value?.data)
    postStore.posts = data.value.data.posts
}, { immediate: true })
</script>

<template>
  <MainHeader />

  <CommonLoading :error="error?.data" :is-loading="pending" />

  <main>
    <section
      v-for="item in postStore.posts"
      :key="item.id"
    >
      <PostItem
        :post="item"
        :owner="item.owner"
      />
    </section>
  </main>
  <!-- <main v-else>
    <h3 class="error">
      No Post Yet
    </h3>
  </main> -->
</template>

<style lang="scss" scoped>
@use "~/assets/index/main";
</style>
