import Login from '@/components/Login.vue'
import PostSend from '@/components/Post/PostSend.vue'

// ↑ Avoid using dynamic rendering to prevent cluttered UI during loading.

export const useModalStore = defineStore('modal', () => {
  const showModal = ref(false)

  const slot = {
    login: Login,
    sendPost: PostSend,
  }

  type ModalSlot = keyof typeof slot

  const modalSlot = ref<ModalSlot>('login')
  const curSlot = computed(() => slot[modalSlot.value])

  function toggleModal(s?: ModalSlot) {
    showModal.value = !showModal.value
    if (s)
      modalSlot.value = s
  }

  return {
    curSlot,
    showModal,
    toggleModal,
  }
})
