import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fakePosts } from '~/mock/mock'
import type { Post } from '~/types'

export const usePostStore = defineStore('post', () => {
  const posts = ref(fakePosts)

  const getById = (id: string) => posts.value.find(post => post.id === id) || null

  const addPost = (post: Post) => {
    posts.value.push(post)
  }

  return {
    posts,
    getById,
    addPost,
  }
})
