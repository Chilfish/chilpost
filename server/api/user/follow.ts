import type { ApiResult, User } from '~/types'
import { delay, toggleFollow } from '~/utils'

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

  await toggleFollow(curUser, user)

  return {
    data: true,
  }
})
