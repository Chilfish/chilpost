import type { RowDataPacket } from 'mysql2'

export type uid = string

export interface UserStatus {
  follower_count: number
  following_count: number
  post_count: number

  followers: uid[]
  following: uid[]
}

export interface User {
  id: uid
  email: string
  createdAt: string
  name: string
  nickname: string
  bio: string
  avatar: string
  status: UserStatus
}

export type UserDetail = Omit<User, 'email' | 'createdAt'>

export type UserDisplay = Pick<User, 'name' | 'nickname' | 'avatar'>

export interface UserLogin {
  email: string
  password: string
}

export type UserAuth = User & UserLogin

export interface UserWithToken {
  user: Omit<UserAuth, 'password'>
  token: string
}

/** the returns from db query */
export type UserDB = UserAuth[] & RowDataPacket[]
