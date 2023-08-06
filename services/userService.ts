import type { ApiResult, Id } from '~/types'
import type { User } from '~/types/user'

export class UserService {
  curUser?: User

  public async fetchCurUser() {
    const user = await fetch('/api/user/me')
      .then(res => res.json())
    this.curUser = user
    return user
  }

  public async getById(id: Id): Promise<User | null> {
    const { data } = await useFetch<User>(`/api/user/search?id=${id}`)
    return data.value
  }

  public async getByName(name: string): Promise<User | null> {
    const { data } = await useFetch<User>(`/api/user/search?name=${name}`)
    return data.value
  }

  // mock, should do it in backend
  public async follow(id: Id) {
    const { data } = await useFetch<ApiResult>(`/api/user/follow?id=${id}&curId=${this.curUser?.id}`)
    return data.value
  }

  public async saveSettings(user: User): Promise<User> {
    // await delay(2100)

    // const index = this.users.findIndex(u => u.id === user.id)
    // if (index === -1)
    //   return this.curUser!

    // this.users[index] = { ...user }
    // this.curUser = user

    // return user
  }
}
