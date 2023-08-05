import { users } from './_mock.js' // due to typescript ES module, should use with .js extension
import type { Post, PostDetail } from '~/types'

export function toDetail(post: Post): PostDetail {
  const owner = users.find(user => user.id === post.owner_id)
  if (!owner)
    throw new Error('Owner not found')
  return {
    ...post,
    owner,
  }
}
