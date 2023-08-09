import type { Id, PostDetail } from '~/types'

export const usePostStore = defineStore('post', () => {
  const posts = ref([] as PostDetail[])

  async function setPosts(_posts: PostDetail[]) {
    posts.value = _posts
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
    setPosts,
    addPost,
    getById,
    toggleLike,
  }
})
