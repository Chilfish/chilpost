import type { ResultSetHeader } from 'mysql2'
import db from '~~/database'
import { likePost } from '~~/database/queries'

export default defineEventHandler(async (event) => {
  const { id } = await readBody(event) as { id: string }
  const { uid } = event.context

  const [row] = await db.query<ResultSetHeader>(likePost, {
    post_id: Number(id),
    user_id: uid,
  })

  return {
    data: {
      count: row.affectedRows,
    },
  }
})
