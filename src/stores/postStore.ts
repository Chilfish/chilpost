import { defineStore } from 'pinia'
import type { PostDetail, pid, uid } from '~/types'

export const usePostStore = defineStore('post', () => {
  const posts = ref([] as PostDetail[])

  async function setPosts(_posts: PostDetail[]) {
    posts.value = _posts
  }

  function getById(id: pid) {
    return computed(() => posts.value.find(p => p.post.id === id))
  }

  async function toggleLike(id: pid) {
    const post = getById(id)

    try {
      const { data } = await useMyFetch<uid[]>(`/post/like?id=${id}`)
      if (data) {
        post.value && (post.value.post.status.likes = data)
        return data
      }
    }
    catch (e: any) {
      // console.log('toggle like error', e)
    }
  }

  function addPost(post: PostDetail) {
    posts.value.unshift(post)
  }

  return {
    posts,
    setPosts,
    addPost,
    getById,
    toggleLike,
  }
})
