import type { ResultSetHeader } from 'mysql2'
import type { PostDB, PostDetail } from '~/types'
import db from '~~/database'
import { getPostById, likePost, unlikePost } from '~~/database/queries'

export default defineEventHandler(async (event) => {
  const { id } = await readBody(event) as { id: string }
  const { uid } = event.context

  assertParams({ id })

  const [post_res] = await db.query<PostDB>(getPostById, { id: Number(id) })
  const post = post_res[0] as PostDetail

  if (!post) {
    throw new MyError({
      message: `Post not found. Id: ${id}`,
      code: 'notfound_post',
      statusCode: 404,
    })
  }

  let sql = likePost

  if (post.status.likes.includes(uid))
    sql = unlikePost

  const [row] = await db.query<ResultSetHeader>(sql, {
    post_id: id,
    user_id: String(uid),
  })

  return newReturn({
    count: row.affectedRows,
  }, 'like post success')
})
