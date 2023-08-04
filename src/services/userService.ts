import { ref } from 'vue'
import { delay } from '~/utils'
import { fakeUsers } from '~/mock/mock'
import type { Id, User } from '~/types'

export class UserService {
  private users = fakeUsers

  curUser = ref(this.users.find(user => user.name === 'chilfish')!)

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
    if (!user || user.id === this.curUser.value.id)
      return this.users

    if (!user.status.is_following) {
      user.status.follower_count++
      this.curUser.value.status.following_count++
    }
    else {
      user.status.follower_count--
      this.curUser.value.status.following_count--
    }

    user.status.is_following = !user.status.is_following

    return this.users
  }
}
