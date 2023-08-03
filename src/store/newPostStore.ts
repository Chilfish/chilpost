import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNewPostStore = defineStore('newPost', () => {
  const showModal = ref(false)

  function toggleModal() {
    showModal.value = !showModal.value
  }

  return {
    showModal,
    toggleModal,
  }
})
