import { isDev } from '~/utils'
import type { ApiResult, User } from '~/types'

interface Body {
  email: string
  password: string
}

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody<Body>(event)

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

  const token = await createToken({ id: user.id })

  setCookie(event, 'token', token, {
    httpOnly: true,
    secure: !isDev,
    sameSite: 'strict',
    path: '/',
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
  })

  const { password: _, ...userWithoutPass } = user

  return {
    result: true,
    data: userWithoutPass,
  } as ApiResult<User>
})
