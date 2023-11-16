import type { RowDataPacket } from 'mysql2'

/** primary key, auto increasing, uuid */
export type uid = number

export type Level = 'admin' | 'user'

export interface UserStatus {
  follower_count: number
  following_count: number
  post_count: number

  followers: uid[]
  followings: uid[]
}

export interface User {
  id: uid
  email: string
  name: string
  nickname: string
  bio: string
  level: Level

  /** path to avatar file */
  avatar: string

  /** soft delete, default to false */
  deleted: boolean

  // times are in ISO format, default to now
  created_at: string
  updated_at: string
  deleted_at: string

  status: UserStatus
}

export type UserDetail = Omit<User, 'email' | 'created_at'>

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
