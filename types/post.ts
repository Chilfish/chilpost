import type { Id, User } from 'types'

export interface PostStatus {
  like_count: number
  comment_count: number
  repost_count: number
  is_liked: boolean
}

export interface Post {
  id: Id
  content: string
  createdAt: string
  owner_id: Id
  status: PostStatus
}

export interface PostDetail extends Post {
  owner: User
}

export interface PostsWithOwner {
  owner: User
  posts: Post[]
}
