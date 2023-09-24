import db from '@db'
import { authUser } from '@db/queries'
import type { UserDB, UserLogin } from '~/types'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody<UserLogin>(event)

  assertParams({ email, password })

  const [res] = await db.query<UserDB>(authUser, { email })
  const user = res[0]
  // console.log(res)

  if (!user)
    return newError('notfound_user')

  const verified = password === user.password
  if (!verified)
    return newError('incorrect_password')

  event.context = {
    ...event.context,
    user,
    uid: user.id,
    level: user.level,
  }

  return {
    data: await userWithToken(user, event),
  }
})
