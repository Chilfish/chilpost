import { defineStore } from 'pinia'
import type { NewPostBody, PostDetail, pid } from '~/types'

export const usePostStore = defineStore('post', () => {
  const posts = ref([] as PostDetail[])

  const newPostBody = ref<NewPostBody>({
    content: '',
    meta: {
      type: 'post',
    },
  })

  function getById(id: pid) {
    return computed(() => posts.value.find(p => p.id === id))
  }

  function addPost(post: PostDetail) {
    posts.value.unshift(post)
  }

  return {
    posts,
    newPostBody,

    addPost,
    getById,
  }
})
