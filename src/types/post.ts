import type { RowDataPacket } from 'mysql2'
import type { User, uid } from '.'

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
  is_liked: boolean
  like_count: number
  comment_count: number
  repost_count: number

  // should not return real ids to client
  // likes: string[] // due to mysql8.0, json array should be string type
  comments: string[]
  reposts: string[]
}

export interface Post {
  id: pid
  is_body: boolean
  content: string
  created_at: string
  owner_id: uid

  status: PostStatus

  parent_id: pid
  parent_post?: PostDetail
}

export type PostDetail = Post & {
  owner: User
}

export type PostDB = PostDetail[] & RowDataPacket[]

/**
 * Posts with owner
 */
export interface PostsWithOwner {
  posts: PostDetail[] // !TODO should be Post[]
  owner: User
}

export interface PostResponse {
  posts: PostDetail[]
  count: number
  pages: number
}
