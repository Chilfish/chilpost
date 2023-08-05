import type { VercelRequest, VercelResponse } from '@vercel/node'
import { posts, users } from '../_mock.js'
import { toDetail } from '../_utils.js'
import type { PostsWithOwner } from '~/types'

interface QueryParams {
  id?: string
  ownerName?: string
}

export default function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  const {
    id,
    ownerName,
  } = req.query as QueryParams

  if (Object.keys(req.query).length < 1)
    return res.status(400).json({ message: 'Missing query params' })

  try {
    if (id)
      return res.json(byId(id))
    if (ownerName)
      return res.json(byOwnerName(ownerName))
  }
  catch (err: any) {
    return res.status(404).json({ message: err.message })
  }
}

function byId(id: string) {
  const post = posts.find(post => post.id === id)
  if (!post)
    throw new Error('Post not found')
  return toDetail(post)
}

function byOwnerName(owner_name: string): PostsWithOwner {
  const owner = users.find(user => user.name === owner_name)
  if (!owner)
    throw new Error('Owner not found')
  const ownerPost = posts.filter(post => post.owner_id === owner.id)
  return {
    owner,
    posts: ownerPost,
  }
}
