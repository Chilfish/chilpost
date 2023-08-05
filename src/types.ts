export type Id = string

export interface UserStatus {
  follower_count: number
  following_count: number
  post_count: number
  is_following: boolean

  // followers: Id[]
  // following: Id[]
}

export interface User {
  id: Id
  nick_name: string
  name: string
  email: string
  bio: string
  avatar: string
  createdAt: string
  status: UserStatus
}

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
