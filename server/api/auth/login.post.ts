import db from '@db'
import { authUserSQL } from '@db/user'
import type { UserDB, UserLogin } from '~/types'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody<UserLogin>(event)

  assertParams({ email, password })

  const [res] = await db.query<UserDB>(authUserSQL, { email })
  const user = res[0]
  console.log(res)
  if (!user)
    return newError('notfound_user')

  const verified = password === user.password
  if (!verified)
    return newError('incorrect_password')

  return {
    data: await userWithToken(user, event),
  }
})
