import type { UserLogin } from '~/types'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody<UserLogin>(event)

  assertParams({ email, password })

  const _user = await getUserByEmail(email)

  if (_user)
    return newError('conflict_user')

  const user = newUser(email, password)

  return {
    data: await userWithToken(user, event),
  }
})
