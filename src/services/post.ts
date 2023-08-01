import { posts } from '~/mock'
import type { Post } from '~/types'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export class PostService {
  private posts: Post[] = posts

  public async getPosts(): Promise<Post[]> {
    await delay(1000)
    return this.posts
  }

  public async getById(id: string): Promise<Post | null> {
    await delay(500)
    return this.posts.find(post => post.id === id) ?? null
  }

  public async createPost(post: Post): Promise<Post> {
    this.posts.push(post)
    return post
  }
}

export type TPostService = InstanceType<typeof PostService>
