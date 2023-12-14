import { defineStore } from 'pinia'
import Toast from '@cpa/Toast'
import type { User } from '~/types'

export const useUserStore = defineStore('user', () => {
  const curUser = ref<User | null>(null)

  async function logout() {
    // only in nuxt SSR mode
    if (!useRuntimeConfig().app.proxy)
      await useMyFetch('/auth/logout', { method: 'POST' })

    curUser.value = null
    useCookie('token').value = ''
    Toast({ message: 'Logout successfully.', type: 'success' })
    navigateTo({ name: 'index' })
  }

  async function fetchMe() {
    const { data } = useMyFetch<User>('/user/me')

    // console.log(data)

    watch(data, (user) => {
      if (!user?.data?.name)
        return
      curUser.value = user.data
    })
  }

  return {
    curUser,
    fetchMe,
    logout,
  }
})
