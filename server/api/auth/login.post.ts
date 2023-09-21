import type { UserLogin } from '~/types'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody<UserLogin>(event)

  assertParams({ email, password })

  const user = await getUserByEmail(email)

  if (!user)
    return newError('notfound_user')

  const verified = password === user.password
  if (!verified)
    return newError('incorrect_password')

  return {
    data: await userWithToken(user, event),
  }
})
