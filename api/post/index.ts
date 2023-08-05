import type { VercelRequest, VercelResponse } from '@vercel/node'
import { fakePosts, fakeUsers } from '../_mock.js'
import type { PostDetail, PostsWithOwner } from '~/types.js'

const posts: PostDetail[] = fakePosts.map((post) => {
  const owner = fakeUsers.find(user => user.id === post.owner_id)!
  return {
    ...post,
    owner,
  }
})

function byOwnerName(owner_name: string): PostsWithOwner {
  const owner = fakeUsers.find(user => user.name === owner_name)
  if (!owner)
    throw new Error('Owner not found')
  const posts = fakePosts.filter(post => post.owner_id === owner.id)
  return {
    owner,
    posts,
  }
}

export default function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  const {
    id,
    owner_name,
    all,
  } = req.query as { id?: string; owner_name?: string; all?: boolean }

  if (all)
    return res.json(posts)

  if (owner_name) {
    try {
      const post = byOwnerName(owner_name)
      return res.json(post)
    }
    catch (err: any) {
      return res.status(404).json({ message: err.message })
    }
  }

  const post = id ? posts.find(post => post.id === id) : null

  if (!post)
    return res.status(404).json({ message: 'Post not found' })

  return res.json(post)
}
