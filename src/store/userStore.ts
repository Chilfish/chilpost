import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fakeUsers } from '~/mock/mock'

export const useUserStore = defineStore('user', () => {
  const users = ref(fakeUsers)

  const getById = (id: string) => users.value.find(user => user.id === id)

  return {
    users,
    getById,
  }
})
