import type { PostResponse } from '~/types'

export const postRouterMap = {
  explore: {
    path: '/post/all',
    store: 'allPosts',
  },
  home: {
    path: '/post/feed',
    store: 'feedPosts',
  },
  search: {
    path: '/post/search',
    store: 'searchPosts',
  },
  profile: {
    path: '/post/all',
    store: 'userPosts',
  },
} as const

export type PostType = keyof typeof postRouterMap

export function useLoadPosts(key: PostType) {
  const userStore = useUserStore()
  const postStore = storeToRefs(usePostStore())
  const store = postStore[postRouterMap[key].store]
  const page = ref(1)
  const pending = ref(false)

  const {
    data: postData,
    error,
    execute: fetchPosts,
  } = useMyFetch<PostResponse>(postRouterMap[key].path, {
    query: {
      username: key === 'profile' ? userStore.homeProfile.name : undefined,
      with_owner: key === 'profile' ? false : undefined,
      q: key === 'search' ? postStore.searchWord : undefined,
      page,
    },
    server: false,
    manual: true,
  })

  watchImmediate(postData, () => {
    if (!postData.value)
      return

    const { statusCode, data } = postData.value

    if (statusCode !== 200) {
      store.value.page--
      page.value--
    }

    if (data) {
      pending.value = false
      page.value++
      store.value = {
        posts: store.value.posts.concat(data.posts),
        totalPages: data.pages,
        page: store.value.page + 1,
      }
    }
  })

  return {
    store,
    page,

    fetchPosts,
    pending,
    error,
  }
}
