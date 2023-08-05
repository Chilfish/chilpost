import { delay } from '~/utils'
import type { Id, User } from '~/types'

export class UserService {
  private users = [] as User[]

  curUser: User | null = null

  public async fetchCurUser() {
    const user = await fetch('/api/user/me')
      .then(res => res.json())
    this.curUser = user
    return user
  }

  public async getById(id: Id): Promise<User | null> {
    const user = this.users.find(user => user.id === id)
    return user || null
  }

  public async getByName(name: string): Promise<User | null> {
    const user = this.users.find(user => user.name === name.toLowerCase())
    return user || null
  }

  // mock, should do it in backend
  public async follow(id: Id): Promise<User[]> {
    await delay(2100)
    const user = this.users.find(user => user.id === id)
    if (!user || user.id === this.curUser?.id)
      return this.users

    // if (!user.status.is_following) {
    //   user.status.follower_count++
    //   this.curUser.status.following_count++
    // }
    // else {
    //   user.status.follower_count--
    //   this.curUser.status.following_count--
    // }

    user.status.is_following = !user.status.is_following

    return this.users
  }

  public async saveSettings(user: User): Promise<User> {
    await delay(2100)

    const index = this.users.findIndex(u => u.id === user.id)
    if (index === -1)
      return this.curUser!

    this.users[index] = { ...user }
    this.curUser = user

    return user
  }
}
