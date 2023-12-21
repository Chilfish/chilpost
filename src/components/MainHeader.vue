<script setup lang="ts">
import type { PostDetail } from '~/types'

const { y } = useWindowScroll()
const isScrollingDown = ref(false)
watch(
  () => y.value,
  (newY, oldY) => {
    isScrollingDown.value = newY > oldY
  },
)

const darkStore = useDarkStore()
const { searchWord, searchPosts } = storeToRefs(usePostStore())
const router = useRouter()
const route = useRoute()

const {
  data: searchRes,
  execute,
} = useMyFetch<{ posts: PostDetail[] }>('/post/search', {
  query: {
    q: searchWord,
    uid: useUserStore().curUser?.id,
  },
  manual: true,
})

function search() {
  execute().then(() => {
    router.push(`/search?q=${searchWord.value}`)
  })
}

watch(searchRes, (data) => {
  if (data?.data)
    searchPosts.value = data?.data.posts
})

onMounted(() => {
  searchWord.value = route.query.q as string

  if (route.path === '/search')
    execute()
})
</script>

<template>
  <header
    :class="isScrollingDown ? 'scroll-up' : ''"
    class="blur-bg"
  >
    <h2>Explore</h2>

    <label>
      <span
        class="i-tabler-search icon"
        @click="search()"
      />
      <input
        v-model="searchWord"
        type="search"
        placeholder="Search"
        @keydown.enter="search()"
      >
    </label>

    <div>
      <NuxtLink
        to="https://github.com/Chilfish/chilpost"
        external
        target="_blank"
      >
        <span class="i-tabler-brand-github icon" />
      </NuxtLink>

      <span
        class="icon"
        :class="darkStore.icon"
        @click="darkStore.toggle()"
      />
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use "~/assets/index/header";
</style>
