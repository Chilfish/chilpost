import { UserService } from '~/services/userService'
import type { Id, User } from '~/types'

export const useUserStore = defineStore('user', () => {
  const users = ref([] as User[])
  const service = new UserService()
  const curUser = ref(service.curUser)

  async function fetchCurUser() {
    curUser.value = await service.fetchCurUser()
  }

  async function getById(id: Id) {
    return await service.getById(id)
  }

  function getByName(name: string) {
    return service.getByName(name)
  }

  async function follow(id: Id) {
    try {
      users.value = await service.follow(id)
      return true
    }
    catch (error) {
      console.error(error)
      return false
    }
  }

  async function saveSettings(user: User) {
    try {
      curUser.value = await service.saveSettings(user)
      return true
    }
    catch (error) {
      console.error(error)
      return false
    }
  }

  return {
    users,
    curUser,
    fetchCurUser,
    getById,
    getByName,

    follow,
    saveSettings,
  }
})
