import type { Id } from '~/types'
import type { Post, PostDetail, PostsWithOwner } from '~/types/post'

export class PostService {
  private posts = [] as PostDetail[]

  private curUser = useUserStore().curUser

  public async fetchPosts() {
    const { data } = await useFetch<PostDetail[]>('/api/post')
    this.posts = data?.value || []

    return this.posts
  }

  public async fetchById(id: Id) {
    const { data } = await useFetch<PostDetail>(`/api/post/search?id=${id}`)

    return data.value
  }

  public async fetchByOwnerName(owner_name: string) {
    const { data } = await useFetch<PostsWithOwner>(`/api/post/search?ownerName=${owner_name}`)

    return data.value
  }

  public async addPost(content: string): Promise<PostDetail> {
    const curUser = this.curUser!
    const { data } = await useFetch<Post>('/api/post/new', {
      method: 'POST',
      body: {
        ownerId: curUser.id,
        content,
      },
    })

    if (!data.value)
      throw new Error('Failed to add post')

    return {
      ...data.value,
      owner: curUser,
    }
  }
}
