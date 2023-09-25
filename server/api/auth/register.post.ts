import type { ResultSetHeader } from 'mysql2'

import { addUser, getUser } from '@db/queries'
import db from '@db'
import type { UserDB, UserLogin } from '~/types'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody<UserLogin>(event)

  assertParams({ email, password })

  const _user = newUser(email, password)

  const [res] = await db.query<ResultSetHeader>(addUser, { ..._user })

  if (!res.insertId)
    return newError('notfound_user')

  const [user] = await db.query<UserDB>(getUser, { id: res.insertId })

  if (!user.length)
    return newError('notfound_user')

  return {
    data: await userWithToken(user[0], event),
  }
})
