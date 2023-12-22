<script setup lang="ts">
const {
  postType,
} = defineProps<{
  postType: PostType
}>()

const infiniteScroll = ref<HTMLElement | null>(null)

const { page, totalPages, posts, error, pending, fetchPosts } = useLoadPosts(postType)
useInfiniteScroll(infiniteScroll, () => {
  console.log('load more')
  if (page.value >= totalPages.value)
    return
  page.value++
  fetchPosts()
}, {
  interval: 100,
  distance: 10,
  canLoadMore: () => page.value < totalPages.value,
})

onMounted(() => {
  fetchPosts()
})
</script>

<template>
  <div
    ref="infiniteScroll"
    class="h-53rem overflow-y-scroll"
  >
    <PostList :posts="posts" />
    <CommonLoading
      :error="error?.data"
      :is-loading="pending"
    />
  </div>
</template>
