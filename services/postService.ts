import type { User } from 'types/user'
import type { ApiResult, Id } from '~/types'
import type { Post, PostDetail, PostsWithOwner } from '~/types/post'

export class PostService {
  private posts = [] as PostDetail[]

  public async fetchPosts() {
    const { data } = await useFetch<PostDetail[]>('/api/post')
    this.posts = data?.value || []

    return this.posts
  }

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
