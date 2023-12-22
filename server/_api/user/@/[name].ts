import db from '@db'
import type { PostDB, User, UserDB } from '~/types'
import { getPostByOwner, getUserByName } from '~~/database/queries'

/**
 * 根据用户名获取用户的详情信息和帖子列表
 */
export default defineEventHandler(async (event) => {
  const { name } = event.context.params as { name: string }

  assertParams({ name })

  const [rows] = await db.query<UserDB>(getUserByName, { name })
  const owner = rows[0] as User

  if (!owner)
    return newError('notfound_user')

  const [posts] = await db.query<PostDB>(getPostByOwner, {
    owner_id: owner.id,
  })

  return newReturn({
    posts,
    owner,
    count: posts.length,
  }, 'get posts success')
})
