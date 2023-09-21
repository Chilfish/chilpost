import { defineStore } from 'pinia'
import type { User } from '~/types'

export const useUserStore = defineStore('user', () => {
  const curUser = ref<User | null>(null)

  async function logout() {
    try {
      await useMyFetch('/auth/logout')
      curUser.value = null
    }
    catch (e: any) {
      console.log('logout', e)
    }
  }

  async function setCurUser(user: User) {
    return curUser.value = user
  }

  async function me() {
    try {
      const { data } = await useMyFetch<User>('/user/me')
      curUser.value = data.value || null
      return curUser.value
    }
    catch (e) {
      return null
    }
  }

  return {
    curUser,
    setCurUser,
    me,
    logout,
  }
})
