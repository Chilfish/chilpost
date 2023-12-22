import { defineStore } from 'pinia'
import type { NewPostBody, PostDetail, pid } from '~/types'

export const usePostStore = defineStore('post', () => {
  /**
   * the All Posts, in /explore
   */
  const posts = ref([] as PostDetail[])
  /**
   * the Feed Posts, in /home
   */
  const feedPosts = ref([] as PostDetail[])
  /**
   * the User Posts, in /user/:id
   */
  const userPosts = ref([] as PostDetail[])
  /**
   * the Posts in search page
   */
  const searchPosts = ref([] as PostDetail[])

  const searchWord = ref('')

  const page = ref(1)
  const totalPages = ref(1)

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
    posts.value.unshift(post)
    feedPosts.value.unshift(post)
    userPosts.value.unshift(post)
  }

  return {
    posts,
    feedPosts,
    userPosts,
    searchPosts,

    searchWord,
    newPostBody,

    page,
    totalPages,

    addPost,
  }
})
