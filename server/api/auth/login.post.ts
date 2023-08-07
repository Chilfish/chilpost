import type { UserLogin } from '~/types'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody<UserLogin>(event)

  if (!email || !password) {
    return createError({
      statusCode: 400,
      message: 'Missing email or password',
    })
  }

  const user = await getUserByEmail(email)

  if (!user) {
    return createError({
      statusCode: 404,
      message: 'User not found',
    })
  }

  const verified = password === user.password
  if (!verified) {
    return createError({
      statusCode: 401,
      message: 'Incorrect password',
    })
  }

  return saveCookie(event, user)
})
