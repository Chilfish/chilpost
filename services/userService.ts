import type { ApiResult, Id, User, UserLogin } from '~/types'

export class UserService {
  curUser?: User | null

  public async fetchCurUser() {
    const { data } = await useFetch<ApiResult<User>>('/api/auth/me')

    if (data.value?.result)
      this.curUser = data.value?.data
    return this.curUser
  }

  public async login({ email, password }: UserLogin) {
    const { data } = await useFetch<ApiResult<User>>('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    })

    if (data.value?.result)
      this.curUser = data.value.data

    return data.value
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
