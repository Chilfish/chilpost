import { usePostStore } from '~/store/postStore'
import type { Id, Post } from '~/types'

export class PostService {
  private postStore = usePostStore()

  public async getPosts() {
    return this.postStore.posts
  }

  public async getById(id: Id) {
    return this.postStore.getById(id)
  }

  public async getByOwner(owner: Id) {
    return this.postStore.getByOwner(owner)
  }

  public async addPost(post: Post) {
    this.postStore.addPost(post)
    return post
  }

  public async toggleLike(id: Id) {
    return this.postStore.toggleLike(id)
  }
}
