import type { ApiResult, User, UserAuth } from '~/types'

export default defineEventHandler(async (event): ApiResult<User> => {
  const user = event.context.user as UserAuth

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
