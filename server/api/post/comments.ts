import db from '@db'
import { getComments } from '@db/queries'
import type { PostDB } from '~/types'

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event) as { id: string }

  const [comments] = await db.query<PostDB>(getComments, { parent_id: Number(id) })

  return newReturn(
    {
      comments,
      count: comments.length,
    },
    'get comments success',
  )
})
