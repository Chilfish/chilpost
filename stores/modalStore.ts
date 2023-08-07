export const useModalStore = defineStore('modal', () => {
  const showModal = ref(false)

  const slot = {
    login: defineAsyncComponent(() => import('@/components/Login.vue')),
    sendPost: defineAsyncComponent(() => import('@/components/Post/PostSend.vue')),
  }

  type ModalSlot = keyof typeof slot

  const modalSlot = ref<ModalSlot>('login')
  const curSlot = computed(() => slot[modalSlot.value])

  function toggleModal(s?: ModalSlot) {
    showModal.value = !showModal.value
    if (typeof s === 'string')
      modalSlot.value = s
  }

  return {
    curSlot,
    showModal,
    toggleModal,
  }
})
