import type { PostDetail, PostsWithOwner } from './../types'
import { fakePosts, fakeUsers } from '~/mock/mock'
import type { Id, Post } from '~/types'
import { delay } from '~/utils'

export class PostService {
  private posts = fakePosts
  private users = fakeUsers

  public async fetchPosts(): Promise<PostDetail[]> {
    await delay(500)
    return this.posts.map((post) => {
      const owner = this.users.find(user => user.id === post.owner_id)
      if (!owner)
        throw new Error('Owner not found')
      return {
        ...post,
        owner,
      }
    })
  }

  public async fetchById(id: Id): Promise<PostDetail | null> {
    await delay(500)
    const post = this.posts.find(post => post.id === id)
    const owner = this.users.find(user => user.id === post?.owner_id)

    if (!post || !owner)
      return null
    return {
      ...post,
      owner,
    }
  }

  public async fetchByOwnerName(owner_name: string): Promise<PostsWithOwner> {
    const owner = this.users.find(user => user.name === owner_name)
    if (!owner)
      throw new Error('Owner not found')

    await delay(500)
    const posts = this.posts.filter(post => post.owner_id === owner.id)

    return {
      owner,
      posts,
    }
  }

  public async addPost(post: Post) {
    // this.postStore.addPost(post)
    // return post
  }

  public async toggleLike(id: Id) {
    // return this.postStore.toggleLike(id)
  }
}
