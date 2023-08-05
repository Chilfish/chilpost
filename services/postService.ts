import type { Id, Post, PostDetail, PostsWithOwner } from '~/types'

export class PostService {
  private posts = [] as Post[]

  private curUser = useUserStore().curUser

  public async fetchPosts(): Promise<PostDetail[]> {
    const posts = await fetch('/api/post')
      .then(res => res.json())
    this.posts = posts

    return posts
  }

  public async fetchById(id: Id): Promise<PostDetail | null> {
    const post = await fetch(`/api/post/search?id=${id}`)
      .then(res => res.json())
    if (post.status === 404)
      return null
    return post
  }

  public async fetchByOwnerName(owner_name: string): Promise<PostsWithOwner> {
    const post = await fetch(`/api/post/search?ownerName=${owner_name}`)
      .then(res => res.json())

    return post
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
