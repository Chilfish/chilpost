import { defineStore } from 'pinia'
import { ref } from 'vue'
import { PostService } from '~/services/postService'
import type { Id, Post } from '~/types'

export const usePostStore = defineStore('post', () => {
  const posts = ref([] as Post[])

  const service = new PostService()

  const fetchPosts = async () => {
    if (!posts.value.length)
      posts.value = await service.fetchPosts()
    return posts.value
  }

  const fetchById = async (id: Id) => {
    const post = await service.fetchById(id)
    if (post)
      posts.value.push(post)
    return post
  }

  const getById = (id: Id): Post | null => posts.value.find(post => post.id === id) || null

  const getByOwner = (owner: Id): Post[] => posts.value.filter(post => post.owner === owner)

  const addPost = (post: Post) => {
    posts.value.push(post)
  }

  const toggleLike = async (id: Id) => {
    const post = getById(id)
    if (!post)
      return null

    post.status.is_liked = !post.status.is_liked
    post.status.like_count += post.status.is_liked ? 1 : -1
    await service.toggleLike(id)
    return post
  }

  return {
    posts,
    fetchPosts,
    fetchById,

    getById,
    getByOwner,
    addPost,
    toggleLike,
  }
})
