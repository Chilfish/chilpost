<script setup lang="ts">
definePageMeta({
  description: 'Explore Chilpost',
  showFAB: true,
  alias: '/explore',
})

useHead({
  title: 'Explore Chilpost', // reset while route changed
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
  state,
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

    <div>
      <NuxtLink
        to="https://github.com/Chilfish/chilpost"
        external
        target="_blank"
      >
        <span class="icon i-tabler-brand-github" />
      </NuxtLink>

      <span
        class="icon"
        :class="darkStore.icon"
        @click="darkStore.toggle()"
      />
    </div>
  </header>

  <CommonLoading v-if="isLoading" :is-loading="isLoading" />
  <main v-if="state">
    <CommonError v-if="state.error" :error="state.error" />
    <PostItem
      v-for="post in state?.data"
      :key="post.id"
      :post="post"
      :owner="post.owner"
    />
  </main>
</template>

<style lang="scss" scoped>
@use "~/assets/index";
</style>
