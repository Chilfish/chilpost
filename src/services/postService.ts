import type { ApiResult, Id, Post, PostDetail, PostsWithOwner, User } from '~/types'

export class PostService {
  public async fetchById(id: Id) {
    const { data } = await useFetch<ApiResult<PostDetail>>(`/api/post/search?id=${id}`)

    return data.value
  }

  public async fetchByOwnerName(owner_name: string) {
    const { data } = await useFetch<ApiResult<PostsWithOwner>>(`/api/post/search?ownerName=${owner_name}`)

    return data.value
  }

  public async addPost(content: string, owner: User): Promise<PostDetail> {
    const { data } = await useFetch<Post>('/api/post/new', {
      method: 'POST',
      body: {
        ownerId: owner.id,
        content,
      },
    })

    if (!data.value)
      throw new Error('Failed to add post')

    return {
      ...data.value,
      owner,
    }
  }
}
