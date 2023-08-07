import type { Id, User, UserLogin } from '~/types'
import { UserService } from '~/services/userService'

export const useUserStore = defineStore('user', () => {
  const service = new UserService()
  const curUser = ref(service.curUser)

  async function login({ email, password }: UserLogin) {
    return await service.login({ email, password })
  }

  async function fetchCurUser() {
    curUser.value = await service.fetchCurUser()
    return curUser.value
  }

  function setCurUser(user: User) {
    curUser.value = user
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
    fetchCurUser,
    getById,
    getByName,

    follow,
    saveSettings,
  }
})
