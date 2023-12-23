<script setup lang="ts">
import type { UserDisplay } from '~/types'

const {
  postType,
} = defineProps<{
  postType: PostType
  user?: UserDisplay
}>()

const { store, page, error, pending, fetchPosts } = useLoadPosts(postType)
const route = useRoute()
const postStore = usePostStore()
const { ratioY } = useScrollRatio()

const postListRef = ref<HTMLElement | null>(null)

const canLoadMore = computed(() =>
  store.value.page >= 0
  && store.value.page < store.value.totalPages
  && ratioY.value > 0.9,
)

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

watchImmediate(() => route.path, async () => {
  if (postType === 'profile') {
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

watchImmediate(canLoadMore, value => value && fetchPosts())

onMounted(async () => {
  await fetchPosts()

  // auto load more posts when the page is not full
  if (postListRef.value!.scrollHeight < document.body.scrollHeight)
    await fetchPosts()
})
</script>

<template>
  <div
    ref="postListRef"
  >
    <PostList
      :user="user"
      :posts="store.posts"
    />
    <CommonLoading
      :error="error?.data"
      :is-loading="pending"
    />
  </div>
</template>
