import type { Id } from 'types'
import type { User } from '~/types/user'
import { UserService } from '~/services/userService'

export const useUserStore = defineStore('user', () => {
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
    return service.follow(id)
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
