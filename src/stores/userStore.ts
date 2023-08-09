import type { Id, User, UserLogin } from '~/types'
import { UserService } from '~/services/userService'

export const useUserStore = defineStore('user', () => {
  const service = new UserService()
  const curUser = ref<User | null>(null)

  async function login({ email, password }: UserLogin) {
    return await service.login({ email, password })
  }

  async function logout() {
    await useMyFetch('/auth/logout')
    curUser.value = null
  }

  async function register({ email, password }: UserLogin) {
    return await service.register({ email, password })
  }

  async function fetchCurUser() {
    // curUser.value = await service.fetchCurUser()
    // return curUser.value
  }

  async function setCurUser(user?: User) {
    if (user)
      return curUser.value = user

    try {
      const user = await useMyFetch<User>('/auth/me')
      const { data } = user
      curUser.value = data || null
    }
    catch (e) {
      // console.log(e)
    }
  }

  async function getById(id: Id) {
    return await service.getById(id)
  }

  function getByName(name: string) {
    return service.getByName(name)
  }

  async function follow(id: Id) {
    return service.follow(id)
  }

  async function saveSettings(user: User) {
    return service.saveSettings(user)
  }

  return {
    curUser,
    setCurUser,
    login,
    logout,
    register,

    fetchCurUser,
    getById,
    getByName,

    follow,
    saveSettings,
  }
})
