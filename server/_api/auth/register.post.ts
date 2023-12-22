import type { ResultSetHeader } from 'mysql2'

import { addUser, addUserStatus, getUser } from '@db/queries'
import db from '@db'
import type { UserDB, UserLogin } from '~/types'

/**
 * 注册用户，返回用户信息和 token
 */
export default defineEventHandler(async (event) => {
  const { email, password } = await readBody<UserLogin>(event)

  assertParams({ email, password })

  const _user = newUser(email, password)

  const [res] = await db.query<ResultSetHeader>(addUser, { ..._user })
  await db.query<ResultSetHeader>(addUserStatus, { id: res.insertId })

  if (!res.insertId)
    return newError('notfound_user')

  const [row] = await db.query<UserDB>(getUser, { id: res.insertId })

  if (!row.length)
    return newError('notfound_user')

  const user = row[0]
  const userWithoutPass = withoutPass(user)

  event.context = {
    ...event.context,
    user: userWithoutPass,
    uid: user.id,
    level: user.level,
  }

  return newReturn(
    await userWithToken(userWithoutPass, event),
    'register success',
  )
})
