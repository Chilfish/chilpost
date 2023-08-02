import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fakePosts } from '~/mock/mock'
import type { Post } from '~/types'

export const usePostStore = defineStore('post', () => {
  const posts = ref(fakePosts)

  const getById = (id: string): Post | null => posts.value.find(post => post.id === id) || null

  const addPost = (post: Post) => {
    posts.value.push(post)
  }

  const toggleLike = (id: string) => {
    const post = getById(id)
    if (!post)
      return null

    post.status.is_liked = !post.status.is_liked
    post.status.like_count += post.status.is_liked ? 1 : -1
    return post
  }

  return {
    posts,
    getById,
    addPost,
    toggleLike,
  }
})
