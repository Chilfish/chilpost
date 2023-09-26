import type { ResultSetHeader } from 'mysql2'
import db from '@db'
import { getUser, setFollowers, setFollowing } from '@db/queries'
import { toggleFollow } from '~/utils'

import type { UserAuth, UserDB } from '~/types'

export default defineEventHandler(async (event) => {
  const curUser = event.context.user as UserAuth

  const { id } = await readBody(event) as { id: string }

  if (curUser.id === Number(id))
    return newError('conflict_follow')

  const [res] = await db.query<UserDB>(getUser, { id })
  const user = res[0]

  if (!user)
    return newError('notfound_user')

  await toggleFollow(curUser, user)

  const [[row], [row1]] = await Promise.all([
    db.query<ResultSetHeader>(setFollowing,
      { id: curUser.id, following: curUser.status.following, following_count: curUser.status.following_count }),
    db.query<ResultSetHeader>(setFollowers,
      { id: user.id, followers: user.status.followers, follower_count: user.status.follower_count }),
  ])

  return newReturn({
    count: row.affectedRows + row1.affectedRows,
  })
})
