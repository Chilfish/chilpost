<script setup lang="ts">
definePageMeta({
  title: 'Explore Chilpost',
  description: 'Explore Chilpost',
  showFAB: true,
  alias: '/explore',
})

const { y } = useWindowScroll()
const isScrollingDown = ref(false)
watch(
  () => y.value,
  (newY, oldY) => {
    isScrollingDown.value = newY > oldY
  },
)

const darkStore = useDarkStore()

const postStore = usePostStore()
const {
  state: posts,
  isLoading,
} = useAsyncState(postStore.fetchPosts(), null)
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

    <span
      class="icon"
      :class="darkStore.icon"
      @click="darkStore.toggle()"
    />
  </header>

  <div v-if="isLoading" class="loading-box">
    <span class="icon loading" />
  </div>

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
