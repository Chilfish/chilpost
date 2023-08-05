<script setup lang="ts">
import { usePostStore } from '~/stores/postStore'

const { y } = useScroll(document)
const isScrollingDown = ref(false)
watch(
  () => y.value,
  (newY, oldY) => {
    isScrollingDown.value = newY > oldY
  },
)

const postStore = usePostStore()
const { isLoading } = useAsyncState(postStore.fetchPosts(), null)

const posts = postStore.posts
</script>

<template>
  <header
    :class="isScrollingDown ? 'scroll-up' : ''"
    class="blur-bg"
  >
    <h2>Explore</h2>

    <label>
      <span class="icon i-tabler-search" />
      <input type="search" placeholder="Search">
    </label>

    <!-- <span class="icon" :class="dark.icon.value" @click="dark.toggle()" /> -->
  </header>

  <main>
    <PostItem
      v-for="post in posts"
      :key="post.id"
      :post="post"
      :owner="post.owner"
    />
  </main>
</template>

<style lang="scss" scoped>
@use "~/assets/index";
</style>
