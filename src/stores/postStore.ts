import { defineStore } from 'pinia'
import type { PostDetail, pid } from '~/types'

export const usePostStore = defineStore('post', () => {
  const posts = ref([] as PostDetail[])

  async function setPosts(_posts: PostDetail[]) {
    posts.value = _posts
  }

  function getById(id: pid) {
    return computed(() => posts.value.find(p => p.post.id === id))
  }

  function addPost(post: PostDetail) {
    posts.value.unshift(post)
  }

  return {
    posts,
    setPosts,
    addPost,
    getById,
  }
})
