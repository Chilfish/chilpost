import db from '@db'
import { getPostById } from '@db/queries'
import type { PostDB, PostDetail, pid } from '~/types'

async function getComment(id: pid) {
  const [row] = await db.query<PostDB>(getPostById, { id })
  return row[0] as PostDetail
}

export default defineEventHandler(async (event) => {
  const { commentIds } = await readBody(event) as { commentIds: pid[] }

  const comments = await Promise.all(commentIds.map(async (id) => {
    const comment = await getComment(id)

    if (!comment) {
      throw new MyError({
        message: `Comment not found. Id: ${id}`,
        code: 'notfound_comment',
        statusCode: 404,
      })
    }
    return comment
  }))

  return newReturn(
    {
      comments,
      count: comments.length,
    },
    'get comments success',
  )
})
