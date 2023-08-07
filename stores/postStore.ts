import type { Id, PostDetail, User } from '~/types'
import { PostService } from '~/services/postService'

export const usePostStore = defineStore('post', () => {
  const posts = ref([] as PostDetail[])

  const service = new PostService()

  async function fetchPosts() {
    posts.value = await service.fetchPosts()
    return posts.value
  }

  async function fetchById(id: Id) {
    const post = await service.fetchById(id)
    return post
  }

  function fetchByOwnerName(name: string) {
    return service.fetchByOwnerName(name)
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

  async function addPost(content: string, owner: User) {
    const newPost = await service.addPost(content, owner)
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
