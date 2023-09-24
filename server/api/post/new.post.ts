import type { ResultSetHeader } from 'mysql2'
import db from '@db'
import { insertComment, insertPost } from '@db/queries'
import type { NewPostBody, UserAuth } from '~/types'

export default defineEventHandler(async (event) => {
  const { content, meta } = await readBody(event) as NewPostBody
  const user = event.context.user as UserAuth

  const { type: postType, pcId } = meta
  const post = newPost(user.id, content, postType === 'post')
  user.status.post_count++

  // just new a post
  if (postType === 'post') {
    const [row] = await db.query<ResultSetHeader>(insertPost, {
      content: post.content,
      owner_id: post.owner_id,
    })

    post.id = row.insertId
  }

  // comment or repost
  if (postType === 'comment') {
    const [row] = await db.query<ResultSetHeader>(insertComment, {
      content: post.content,
      parent_id: pcId,
      owner_id: post.owner_id,
    })

    if (row.affectedRows === 0) {
      throw new MyError({
        message: 'Comment failed',
        code: 'comment_failed',
      })
    }

    post.id = row.insertId
  }

  return {
    data: toDetail(post, user),
  }
})
