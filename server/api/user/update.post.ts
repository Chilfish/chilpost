import { delay } from '~/utils'
import type { ApiResult, User } from '~/types'

export default defineEventHandler(async (event): ApiResult => {
  await delay(500)
  const newUser = await readBody<User>(event)
  const oldUser = event.context.user as User

  if (!oldUser) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  Object.assign(oldUser, newUser)

  return { data: true }
})
