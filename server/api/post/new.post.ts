import type { ResultSetHeader, RowDataPacket } from 'mysql2'
import db from '@db'
import { getParentPost, insertPost, insertPostStatus, updateComment, updateUserPostCount } from '@db/queries'
import type { NewPostBody, PostStatus, UserAuth } from '~/types'

/**
 * 新增一篇帖子或是评论，返回帖子详情
 * 插入 posts 表和 post_status 表，更新 users 表的 post_count
 * 如果是评论，还要更新 parent_post 的 comment_count 和 comments
 */
export default defineEventHandler(async (event) => {
  const { content, meta } = await readBody(event) as NewPostBody
  const user = event.context.user as UserAuth

  const { type: postType, pcId } = meta
  const post = newPost(user.id, content, postType === 'post')
  user.status.post_count++

  let parentPost: PostStatus | undefined
  const insertParams = postType === 'comment'
    ? {
        is_body: false,
        parent_id: pcId,
      }
    : {
        is_body: true,
        parent_id: -1,
      }

  if (postType === 'comment') {
    const [res] = await db.query<PostStatus[] & RowDataPacket[]>(getParentPost, {
      post_id: pcId,
    })

    parentPost = res[0]
  }

  const [res] = await db.query<ResultSetHeader>(insertPost, {
    content,
    owner_id: user.id,
    ...insertParams,
  })

  post.id = res.insertId

  await db.query<ResultSetHeader>(insertPostStatus, {
    post_id: post.id,
  })

  if (postType === 'comment') {
    const [_res] = await db.query<ResultSetHeader>(updateComment, {
      post_id: pcId,
      comment_id: post.id.toString(),
    })

    parentPost!.comment_count++
    parentPost!.comments.push(post.id)
  }

  await db.query<ResultSetHeader>(updateUserPostCount, {
    user_id: user.id,
  })

  return newReturn({
    post: toDetail(post, user),
  }, 'new post success')
})
