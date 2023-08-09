import type { ApiResult } from '~/types'
import { delay } from '~/utils'

interface QueryParams {
  id?: string
  curId?: string
}

export default defineEventHandler(async (event): ApiResult => {
  await delay(500)

  const { id } = getQuery(event) as QueryParams
  const user = fakeUsers.find(user => user.id === id)
  if (!user) {
    return createError({
      status: 404,
      statusMessage: 'User not found',
    })
  }

  const curUser = await getUserFromSession(event)

  if (!curUser) {
    return createError({
      status: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const isFollowing = user.status.is_following ? -1 : 1

  user.status.follower_count += isFollowing
  curUser.status.following_count += isFollowing

  user.status.is_following = !user.status.is_following

  return {
    data: true,
  }
})
