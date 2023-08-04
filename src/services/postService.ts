import { v4 as uuidv4 } from 'uuid'
import type { PostDetail, PostsWithOwner } from './../types'
import { fakePosts, fakeUsers } from '~/mock/mock'
import type { Id, Post } from '~/types'
import { delay } from '~/utils'

export class PostService {
  private posts = fakePosts
  private users = fakeUsers

  private curUser = this.users.find(user => user.name === 'chilfish')! // fake

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
    if (!post)
      return null
    return this.toDetail(post)
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

  public toDetail(post: Post) {
    const owner = this.users.find(user => user.id === post.owner_id)
    if (!owner)
      throw new Error('Owner not found')
    return {
      ...post,
      owner,
    }
  }

  public async addPost(content: string): Promise<PostDetail> {
    const newPost: Post = {
      id: uuidv4(),
      content,
      owner_id: this.curUser.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: {
        like_count: 0,
        comment_count: 0,
        repost_count: 0,
        is_liked: false,
      },
    }
    this.posts.unshift(newPost)
    return this.toDetail(newPost)
  }
}
