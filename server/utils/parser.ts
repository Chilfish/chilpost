import { fakeUsers } from './_mock'
import type { Post, PostDetail, UserAuth } from '~/types'

export function toDetail(post: Post): PostDetail {
  const owner = fakeUsers.find(user => user.id === post.owner_id)!

  const { name, nickname, avatar } = owner

  return {
    post,
    owner: { name, nickname, avatar },
  }
}

export function newPost(
  ownerId: string,
  content: string,
  isBody: boolean = true,
): Post {
  const now = new Date()
  return {
    id: now.toUTCString(), // TODO: from database
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
  const _name = name || email.replace(/[@\.]/gm, '_')
  const user: UserAuth = {
    id: (new Date()).toUTCString(),
    email,
    password,
    name: _name,
    nickname: _name,
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
