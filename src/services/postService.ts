import { usePostStore } from '~/store/postStore'
import type { Post } from '~/types'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export class PostService {
  private postStore = usePostStore()

  public async getPosts(): Promise<Post[]> {
    return this.postStore.posts
  }

  public async getById(id: string): Promise<Post | null> {
    return this.postStore.getById(id)
  }

  public async addPost(post: Post): Promise<Post> {
    this.postStore.addPost(post)
    return post
  }
}

