import type { User, uid } from 'types'

export type pid = string

export type PostType = 'new' | 'comment' | 'repost'

export interface PostMeta {
  type: PostType
  pcId?: pid // parent comment id or repost id
}

export interface PostStatus {
  like_count: number
  comment_count: number
  repost_count: number

  likes: uid[]
  comments: pid[]
  reposts: pid[]
}

export interface Post {
  id: pid
  isBody: boolean
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
