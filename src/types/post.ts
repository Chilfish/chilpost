import type { RowDataPacket } from 'mysql2'
import type { User, UserDetail, uid } from '.'

export type pid = string

export type PostType = 'post' | 'comment' | 'repost'

export interface PostMeta {
  type: PostType

  /** parent comment id or repost id */
  pcId?: pid
}

export interface NewPostBody {
  content: string
  meta: PostMeta
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
  created_at: string
  owner_id: uid
  status: PostStatus

  parentId?: pid
  parentPost?: PostDetail
}

export interface PostDetail {
  post: Post
  owner: User
}

export interface PostsWithOwner {
  owner: UserDetail
  posts: Post[]
}

export type PostDB = PostDetail[] & RowDataPacket[]
