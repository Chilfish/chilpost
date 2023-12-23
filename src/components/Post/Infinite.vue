<script setup lang="ts">
const {
  postType,
} = defineProps<{
  postType: PostType
}>()

const infiniteScroll = ref<HTMLElement | null>(null)
const { store, page, error, pending, fetchPosts } = useLoadPosts(postType)
const route = useRoute()
const postStore = usePostStore()

useInfiniteScroll(infiniteScroll, async () => {
  pending.value = true
  await fetchPosts()
}, {
  interval: 500,
  distance: 10,
  canLoadMore: () => store.value.page >= 0 && store.value.page < store.value.totalPages,
})

watchImmediate(() => route.query, async () => {
  const query = (route.query.q as string | undefined)?.trim()

  if (!query) {
    postStore.searchWord = ''
    postStore.searchPosts.posts = []
    return
  }

  if (postType === 'search') {
    pending.value = true
    store.value = {
      posts: [],
      page: 0,
      totalPages: 1,
    }
    page.value = 1
    await fetchPosts()
  }
})
</script>

<template>
  <div
    ref="infiniteScroll"
    class="max-h-56rem overflow-y-scroll sm:max-h-53rem"
  >
    <PostList :posts="store.posts" />
    <CommonLoading
      :error="error?.data"
      :is-loading="pending"
    />
  </div>
</template>
