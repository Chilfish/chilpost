import type { ApiResult, Id, User } from '~/types'

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

  public async follow(id: Id) {
    const { data } = await useFetch<ApiResult>(`/api/user/follow?id=${id}&curId=${this.curUser?.id}`)
    return data.value
  }

  public async saveSettings(user: User) {
    const { data } = await useFetch<ApiResult>('/api/user/update', {
      method: 'POST',
      body: user,
    })

    if (data.value?.result)
      this.curUser = user

    return data.value
  }
}
