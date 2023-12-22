import type { PostResponse } from '~/types'

export const postType = {
  explore: 'all',
  home: 'feed',
} as const

export type PostType = keyof typeof postType

export function useLoadPosts(key: PostType) {
  const { posts, page, totalPages } = storeToRefs(usePostStore())
  const {
    data: postData,
    pending,
    error,
    execute: fetchPosts,
  } = useMyFetch<PostResponse>(`/post/${postType[key]}`, {
    query: {
      uid: useUserStore().curUser?.id,
      page,
    },
    server: false,
  })

  watch(postData, () => {
    if (postData.value?.data) {
      posts.value = posts.value.concat(postData.value.data.posts)
      totalPages.value = postData.value.data.pages
    }
  }, { immediate: true })

  return {
    posts,
    page,
    totalPages,
    fetchPosts,
    pending,
    error,
  }
}
