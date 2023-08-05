import { v4 as uuidv4 } from 'uuid'
import type { Id, Post, PostDetail, PostsWithOwner, User } from '~/types'

export class PostService {
  private posts = [] as Post[]
  private users = [] as User[] // should not be here

  private curUser = this.users.find(user => user.name === 'chilfish')! // fake

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
