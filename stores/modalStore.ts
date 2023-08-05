export const useModalStore = defineStore('modal', () => {
  const showModal = ref(false)

  function toggleModal() {
    showModal.value = !showModal.value
  }

  return {
    showModal,
    toggleModal,
  }
})
