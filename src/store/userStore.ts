import { defineStore } from 'pinia'
import { ref } from 'vue'
import { UserService } from '~/services/userService'
import type { Id, User } from '~/types'

export const useUserStore = defineStore('user', () => {
  const users = ref([] as User[])
  const service = new UserService()
  const curUser = service.curUser

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

  return {
    users,
    curUser,
    getById,
    getByName,

    follow,
  }
})
