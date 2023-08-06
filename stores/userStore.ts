import type { Id } from 'types'
import type { User } from '~/types/user'
import { UserService } from '~/services/userService'

export const useUserStore = defineStore('user', () => {
  const service = new UserService()
  const curUser = ref(service.curUser)

  async function fetchCurUser() {
    curUser.value = await service.fetchCurUser()
    return curUser.value
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
    fetchCurUser,
    getById,
    getByName,

    follow,
    saveSettings,
  }
})
