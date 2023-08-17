import * as process from 'node:process'
import { fakeUsers } from './_mock'
import { uuid } from '~/utils'
import type { Post, PostDetail, UserAuth } from '~/types'

export const isDev = process.env.NODE_ENV === 'development'

export function toDetail(post: Post): PostDetail {
  const owner = fakeUsers.find(user => user.id === post.owner_id)!

  const { password: _, ...rest } = owner

  return {
    post,
    owner: rest,
  }
}

export function newPost(
  ownerId: string,
  content: string,
  isBody: boolean = true,
): Post {
  const now = new Date()
  return {
    id: uuid(),
    owner_id: ownerId,
    content,
    isBody,
    createdAt: now.toISOString(),
    status: {
      like_count: 0,
      comment_count: 0,
      repost_count: 0,
      likes: [],
      comments: [],
      reposts: [],
    },
  }
}

export function newUser(email: string, password: string, name?: string): UserAuth {
  const _name = name || email.split('@')[0]
  const user: UserAuth = {
    id: uuid(),
    email,
    password,
    name: _name,
    nick_name: _name,
    avatar: '/placeholder.avatar.png',
    bio: 'Hello',
    createdAt: new Date().toISOString(),
    status: {
      post_count: 0,
      follower_count: 0,
      following_count: 0,
      followers: [],
      following: [],
    },
  }
  fakeUsers.unshift(user)
  return user
}

export async function getUserByEmail(email: string) {
  return fakeUsers.find(user => user.email === email)
}

export async function getUserById(id: string) {
  return fakeUsers.find(user => user.id === id)
}
