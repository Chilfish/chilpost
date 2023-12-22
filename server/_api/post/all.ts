import db from '@db'
import { getAllPosts } from '@db/queries'
import type { PostDB } from '~/types'

export default defineEventHandler(async (_event) => {
  const [posts] = await db.query<PostDB>(getAllPosts)

  return newReturn(
    {
      posts,
      count: posts.length,
    },
    'get all posts success',
  )
})
