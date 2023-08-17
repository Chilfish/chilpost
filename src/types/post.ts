import type { User, uid } from 'types'

export type pid = string

export interface PostStatus {
  like_count: number
  comment_count: number
  repost_count: number

  likes: uid[]
}

export interface Post {
  id: pid
  content: string
  createdAt: string
  owner_id: uid
  status: PostStatus
}

export interface PostDetail extends Post {
  owner: User
}

export interface PostsWithOwner {
  owner: User
  posts: Post[]
}
