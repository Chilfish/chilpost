import { defineStore } from 'pinia'
import type { NewPostBody, PostDetail, PostStore } from '~/types'

export const usePostStore = defineStore('post', () => {
  /**
   * the All Posts, in /explore
   */
  const allPosts = ref<PostStore>({
    posts: [],
    totalPages: 0,
    page: 0,
  })
  /**
   * the Feed Posts, in /home
   */
  const feedPosts = ref<PostStore>({
    posts: [],
    totalPages: 0,
    page: 0,
  })
  /**
   * the User Posts, in /user/:id
   */
  const userPosts = ref<PostStore>({
    posts: [],
    totalPages: 0,
    page: 0,
  })
  /**
   * the Posts in search page
   */
  const searchPosts = ref<PostStore>({
    posts: [],
    totalPages: 0,
    page: 0,
  })

  const searchWord = ref('')

  const newPostBody = ref<NewPostBody>({
    content: '',
    meta: {
      type: 'post',
    },
  })

  /**
   * add a post to the top of the posts
   * @param post the post to add
   */
  function addPost(post: PostDetail) {
    allPosts.value.posts.unshift(post)
    feedPosts.value.posts.unshift(post)
    userPosts.value.posts.unshift(post)
  }

  function rmPost(id: string) {
    allPosts.value.posts = allPosts.value.posts.filter(
      post => post.id !== id,
    )
    feedPosts.value.posts = feedPosts.value.posts.filter(
      post => post.id !== id,
    )
    userPosts.value.posts = userPosts.value.posts.filter(
      post => post.id !== id,
    )
  }

  return {
    allPosts,
    feedPosts,
    userPosts,
    searchPosts,

    searchWord,
    newPostBody,

    addPost,
    rmPost,
  }
})
