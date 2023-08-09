import type { ApiResult, User } from '~/types'

export default defineEventHandler(async (event): ApiResult<User> => {
  const user = event.context.user

  if (!user) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const { password: _, ...userWithoutPass } = user

  return {
    data: userWithoutPass,
  }
})
