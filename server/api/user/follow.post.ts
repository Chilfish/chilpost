import type { ResultSetHeader } from 'mysql2'
import db from '@db'
import { getUserSQL, setFollowSQL, setFollowerSQL } from '@db/queries'
import { toggleFollow } from '~/utils'

import type { UserAuth, UserDB } from '~/types'

export default defineEventHandler(async (event) => {
  const curUser = event.context.user as UserAuth

  const { id } = await readBody(event) as { id: string }

  if (curUser.id === id)
    return newError('conflict_follow')

  const [res] = await db.query<UserDB>(getUserSQL, { id })
  const user = res[0]

  if (!user)
    return newError('notfound_user')

  await toggleFollow(curUser, user)

  const [[row], [row1]] = await Promise.all([
    db.query<ResultSetHeader>(setFollowSQL,
      { id: curUser.id, following: curUser.following, following_count: curUser.following_count }),
    db.query<ResultSetHeader>(setFollowerSQL,
      { id: user.id, followers: user.followers, follower_count: user.follower_count }),
  ])

  return {
    data: {
      count: row.affectedRows + row1.affectedRows,
    },
  }
})
