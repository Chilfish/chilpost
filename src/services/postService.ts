import { fakePosts } from '~/mock/mock'
import type { Id, Post } from '~/types'
import { delay } from '~/utils'

export class PostService {
  private posts = fakePosts

  public async fetchPosts(): Promise<Post[]> {
    await delay(500)
    return this.posts
  }

  public async fetchById(id: Id): Promise<Post | null> {
    await delay(500)
    return this.posts.find(post => post.id === id) || null
  }

  public async addPost(post: Post) {
    // this.postStore.addPost(post)
    // return post
  }

  public async toggleLike(id: Id) {
    // return this.postStore.toggleLike(id)
  }
}
