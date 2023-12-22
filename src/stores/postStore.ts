import { defineStore } from 'pinia'
import type { NewPostBody, PostDetail, PostStore } from '~/types'

export const usePostStore = defineStore('post', () => {
  /**
   * the All Posts, in /explore
   */
  const allPosts = shallowRef<PostStore>({
    posts: [],
    totalPages: 1,
    page: 0,
  })
  /**
   * the Feed Posts, in /home
   */
  const feedPosts = shallowRef<PostStore>({
    posts: [],
    totalPages: 1,
    page: 0,
  })
  /**
   * the User Posts, in /user/:id
   */
  const userPosts = shallowRef<PostStore>({
    posts: [],
    totalPages: 1,
    page: 0,
  })
  /**
   * the Posts in search page
   */
  const searchPosts = shallowRef<PostStore>({
    posts: [],
    totalPages: 1,
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

  return {
    allPosts,
    feedPosts,
    userPosts,
    searchPosts,

    searchWord,
    newPostBody,

    addPost,
  }
})
