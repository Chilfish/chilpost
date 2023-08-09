import type { ApiResult, User } from '~/types'
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
      statusCode: 404,
      statusMessage: 'User not found',
    })
  }

  const curUser = event.context.user as User
  if (!curUser) {
    return createError({
      statusCode: 401,
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
