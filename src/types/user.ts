import type { RowDataPacket } from 'mysql2'

/** primary key, auto increasing, uuid */
export type uid = number

export type Level = 'admin' | 'user'

export interface UserStatus {
  is_following: boolean
  follower_count: number
  following_count: number
  post_count: number
}

export interface UserDisplay {
  id: uid
  name: string
  nickname: string
  email: string
  /** path to avatar file */
  avatar: string
}

export interface User extends UserDisplay {
  bio: string

  // times are in ISO format, default to now
  created_at: string

  status: UserStatus
}

export interface UpdatedUser {
  id: uid
  name: string
  nickname: string
  email: string
  bio: string
}

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
