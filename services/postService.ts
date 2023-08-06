import type { Id } from '~/types'
import type { PostDetail, PostsWithOwner } from '~/types/post'

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

    return data
  }

  public async fetchByOwnerName(owner_name: string) {
    const { data } = await useFetch<PostsWithOwner>(`/api/post/search?ownerName=${owner_name}`)

    return data
  }

  public async addPost(content: string): Promise<PostDetail> {
    const newPost = await fetch(`/api/post/new?ownerId=${this.curUser?.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    })
      .then(res => res.json())

    return {
      ...newPost,
      owner: this.curUser,
    }
  }
}
