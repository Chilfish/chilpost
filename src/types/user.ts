export type uid = string

export interface UserStatus {
  follower_count: number
  following_count: number
  post_count: number

  followers: uid[]
  following: uid[]
}

export interface UserBase {
  id: uid
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
