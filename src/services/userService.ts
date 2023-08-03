import { useUserStore } from '~/store/userStore'
import type { User } from '~/types'

export class UserService {
  private userStore = useUserStore()

  public async getUsers() {
    return this.userStore.users
  }

  public async getById(id: string) {
    return this.userStore.getById(id)
  }

  public defaultUser(): User {
    return this.userStore.users[0]
  }
}
