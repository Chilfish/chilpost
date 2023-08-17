import type { Id } from 'types'

export interface UserStatus {
  follower_count: number
  following_count: number
  post_count: number

  followers: Id[]
  following: Id[]
}

export interface UserBase {
  id: Id
  name: string
  email: string
  createdAt: string
}

export interface User extends UserBase {
  nick_name: string
  bio: string
  avatar: string
  status: UserStatus
}

export interface UserLogin {
  email: string
  password: string
}

export type UserAuth = User & UserLogin
