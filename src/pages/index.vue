<script setup lang="ts">
import type { NuxtError } from '#app'
import type { PostDetail } from '~/types'

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
  data,
  pending,
  error,
} = useMyFetch<PostDetail[]>('/post')

const err = computed(() => (error.value as NuxtError)?.toJSON())
const isBodyPosts = computed(() => data.value?.data?.filter(p => p.post.isBody))

watchEffect(() => {
  if (data.value?.data)
    postStore.setPosts(data.value.data)

  useErrorTitle(err.value)
})
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

  <CommonLoading :error="err" :is-loading="pending" />
  <main v-if="data">
    <section
      v-for="item in isBodyPosts"
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
@use "~/assets/index";
</style>
