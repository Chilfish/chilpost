import type { ApiResult, User, UserLogin } from '~/types'

export default defineEventHandler(async (event): ApiResult<User> => {
  const { email, password } = await readBody<UserLogin>(event)

  if (!email || !password) {
    return createError({
      statusCode: 400,
      statusMessage: 'Missing email or password',
    })
  }

  const user = await getUserByEmail(email)

  if (!user) {
    return createError({
      statusCode: 404,
      statusMessage: 'User not found',
    })
  }

  const verified = password === user.password
  if (!verified) {
    return createError({
      statusCode: 401,
      statusMessage: 'Incorrect password',
    })
  }

  return saveCookie(event, user)
})
