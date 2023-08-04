import { fakeUsers } from '~/mock/mock'
import type { Id, User } from '~/types'

export class UserService {
  private users = fakeUsers

  curUser: User = this.users.find(user => user.name === 'chilfish')!

  public async getById(id: Id): Promise<User | null> {
    const user = this.users.find(user => user.id === id)
    return user || null
  }

  public async getByName(name: string): Promise<User | null> {
    const user = this.users.find(user => user.name === name.toLowerCase())
    return user || null
  }
}
