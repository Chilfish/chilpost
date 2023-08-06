import type { Id } from 'types'

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
