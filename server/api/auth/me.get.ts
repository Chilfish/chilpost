import type { ApiResult, User } from '~/types'

export default defineEventHandler(async (event): Promise<ApiResult<User>> => {
  const user = event.context.user

  if (!user) {
    return {
      result: false,
      data: null,
    }
  }

  const { password: _, ...userWithoutPass } = user

  return {
    result: true,
    data: userWithoutPass,
  }
})
