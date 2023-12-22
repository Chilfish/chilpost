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

  if (password !== user.password)
    return newError('incorrect_password')

  const userWithoutPass = withoutPass(user)

  event.context = {
    ...event.context,
    user: userWithoutPass,
    uid: user.id,
    level: user.level,
  }

  return newReturn(
    await userWithToken(userWithoutPass, event),
    'login success',
  )
})
