import db from '@db'
import type { PostDB, PostDetail } from '~/types'
import { getPostById } from '~~/database/queries'

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event) as { id: string }

  assertParams({ id })

  const [row] = await db.query<PostDB>(getPostById, { id: Number(id) })
  const post = row[0] as PostDetail

  if (!post) {
    throw new MyError({
      message: `Post not found. Id: ${id}`,
      code: 'notfound_post',
      statusCode: 404,
    })
  }

  return newReturn(
    post,
    'get post success',
  )
})
