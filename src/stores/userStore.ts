import { defineStore } from 'pinia'
import type { User } from '~/types'

export const useUserStore = defineStore('user', () => {
  const curUser = ref<User | null>(null)

  async function logout() {
    await useMyFetch('/auth/logout')
    curUser.value = null
  }

  async function fetchMe() {
    const { data } = useMyFetch<User>('/user/me')

    watch(data, (user) => {
      if (!user?.data.name)
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
