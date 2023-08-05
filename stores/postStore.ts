import { defineStore } from 'pinia'
import { ref } from 'vue'
import { PostService } from '~/services/postService'
import type { Id, PostDetail } from '~/types'

export const usePostStore = defineStore('post', () => {
  const posts = ref([] as PostDetail[])

  const service = new PostService()

  const fetchPosts = async () => {
    if (!posts.value.length)
      posts.value = await service.fetchPosts()
    return posts.value
  }

  const fetchById = async (id: Id) => {
    const post = await service.fetchById(id)
    return post
  }

  function fetchByOwnerName(name: string) {
    return service.fetchByOwnerName(name)
  }

  const getById = (id: Id): PostDetail | null => posts.value.find(post => post.id === id) || null

  const toggleLike = async (id: Id) => {
    const post = getById(id)
    if (!post)
      return null

    post.status.is_liked = !post.status.is_liked
    post.status.like_count += post.status.is_liked ? 1 : -1
    // await service.toggleLike(id)
    return post
  }

  async function addPost(content: string) {
    const newPost = await service.addPost(content)
    posts.value.unshift(newPost)
    return newPost
  }

  return {
    posts,
    fetchPosts,
    fetchById,
    fetchByOwnerName,
    addPost,
    getById,
    toggleLike,
  }
})
