export interface User {
  id: string
  nick_name: string
  name: string
  email: string
  avatar: string
  createdAt: string
  updatedAt: string
}

export interface PostStatus {
  like_count: number
  comment_count: number
  repost_count: number
  is_liked: boolean
}

export interface Post {
  id: string
  content: string
  createdAt: string
  updatedAt: string
  owner: User
  status: PostStatus
}
