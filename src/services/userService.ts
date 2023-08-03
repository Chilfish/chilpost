import { fakeUsers } from '~/mock/mock'
import type { Id, User } from '~/types'

export class UserService {
  private users = fakeUsers

  public async getById(id: Id): Promise<User | null> {
    const user = this.users.find(user => user.id === id)
    return user || null
  }

  public async getByName(name: string): Promise<User | null> {
    const user = this.users.find(user => user.name === name)
    return user || null
  }

  public async getCurUser(): Promise<User | null> {
    return this.users[0]
  }
}
