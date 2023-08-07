import type { UserLogin } from '~/types'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody<UserLogin>(event)

  if (!email || !password) {
    return createError({
      statusCode: 400,
      message: 'Missing email or password',
    })
  }

  const _user = await getUserByEmail(email)

  if (_user) {
    return createError({
      statusCode: 409,
      message: 'User already exists',
    })
  }

  const user = newUser(email, password)

  return saveCookie(event, user)
})
