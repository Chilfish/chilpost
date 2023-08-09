import type { NuxtError } from '#app'
import type { ApiResult, Id, PostDetail } from '~/types'

export const usePostStore = defineStore('post', () => {
  const posts = ref([] as PostDetail[])

  async function fetchPosts(): ApiResult<PostDetail[]> {
    try {
      const result = await useMyFetch<PostDetail[]>('/post')
      posts.value = result.data || []
      return result
    }
    catch (error) {
      return {
        error: (error as NuxtError).data,
      }
    }
  }

  function getById(id: Id): PostDetail | null {
    return posts.value.find(post => post.id === id) || null
  }

  // TODO
  const toggleLike = async (id: Id) => {
    const post = getById(id)
    if (!post)
      return null

    post.status.is_liked = !post.status.is_liked
    post.status.like_count += post.status.is_liked ? 1 : -1
    // await service.toggleLike(id)
    return post
  }

  function addPost(post: PostDetail) {
    posts.value.unshift(post)
  }

  return {
    posts,
    fetchPosts,
    addPost,
    getById,
    toggleLike,
  }
})
