import db from '@db'
import { getAllPosts } from '@db/queries'
import type { PostDB } from '~/types'

export default defineEventHandler(async (event) => {
  const [posts] = await db.query<PostDB>(getAllPosts)

  return {
    data: posts,
    count: posts.length,
  }
})
