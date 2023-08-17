import type { PostMeta } from '~/types'

import Login from '@/components/Login.vue'
import PostSend from '@/components/Post/PostSend.vue'

// ↑ Avoid using dynamic rendering to prevent cluttered UI during loading.

export const useModalStore = defineStore('modal', () => {
  const showModal = ref(false)

  const postMeta = ref<PostMeta>({ type: 'new' })

  const slot = {
    login: Login,
    sendPost: PostSend,
  }

  type ModalSlot = keyof typeof slot

  const modalSlot = ref<ModalSlot>('login')
  const curSlot = computed(() => slot[modalSlot.value])

  /**
   * Toggle modal
   * @param s Slot name
   * @param meta Post meta
   */
  function toggleModal(s?: ModalSlot, meta?: PostMeta) {
    showModal.value = !showModal.value
    if (s)
      modalSlot.value = s
    if (meta)
      postMeta.value = meta
  }

  function open(s: ModalSlot = 'login') {
    showModal.value = true
    modalSlot.value = s
  }

  return {
    curSlot,
    postMeta,
    showModal,
    toggleModal,
    open,
  }
})
