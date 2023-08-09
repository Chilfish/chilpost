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

  async function setCurUser(user?: User) {
    if (user)
      return curUser.value = user

    try {
      const user = await useMyFetch<User>('/auth/me')
      const { data } = user
      curUser.value = data || null
      return user.data
    }
    catch (e: any) {
      return e.data
    }
  }

  return {
    curUser,
    setCurUser,
    logout,
  }
})
