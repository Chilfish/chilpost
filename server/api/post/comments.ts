import db from '@db'
import { getComments } from '@db/queries'
import type { PostDB } from '~/types'

/**
 * 根据 parent_id 获取帖子的评论列表
 */
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
