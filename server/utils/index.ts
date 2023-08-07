import { users } from './_mock'
import { uuid } from '~/utils'
import type { Post, PostDetail } from '~/types'

export function toDetail(post: Post): PostDetail {
  const owner = users.find(user => user.id === post.owner_id)
  if (!owner)
    throw new Error('Owner not found')

  const { password, ...rest } = owner

  return {
    ...post,
    owner: rest,
  }
}

export function newPost(ownerId: string, content: string): Post {
  const now = new Date()
  return {
    id: uuid(),
    owner_id: ownerId,
    content,
    createdAt: now.toISOString(),
    status: {
      like_count: 0,
      comment_count: 0,
      repost_count: 0,
      is_liked: false,
    },
  }
}

export async function getUserByEmail(email: string) {
  return users.find(user => user.email === email)
}

export async function getUserById(id: string) {
  return users.find(user => user.id === id)
}
