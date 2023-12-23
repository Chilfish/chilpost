import { defineStore } from 'pinia'
import Toast from '@cpa/Toast'
import type { User } from '~/types'

export const useUserStore = defineStore('user', () => {
  const curUser = ref<User | null>(null)
  const isFetched = ref(false)
  const homeProfile = ref({
    name: '',
    nickname: '',
    id: '',
  })

  async function logout() {
    // only in nuxt SSR mode
    if (!useRuntimeConfig().app.proxy)
      await useMyFetch('/auth/logout', { method: 'POST' })

    curUser.value = null
    // have to use setTimeout to avoid the token not being set
    setTimeout(() => {
      useCookie('token').value = '111'
    }, 0)
    Toast({ message: 'Logout successfully.', type: 'success' })
    navigateTo({ name: 'explore' })
  }

  async function fetchMe() {
    const user = (await useMyFetch<User>('/user/me')).data.value?.data

    if (user)
      curUser.value = user

    return user
  }

  return {
    curUser,
    isFetched,
    homeProfile,

    fetchMe,
    logout,
  }
})
