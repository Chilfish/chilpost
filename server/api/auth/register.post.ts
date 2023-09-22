import type { ResultSetHeader } from 'mysql2'

import { addUserSQL, getUserSQL } from '@db/user'
import db from '@db'
import type { UserDB, UserLogin } from '~/types'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody<UserLogin>(event)

  assertParams({ email, password })

  const _user = newUser(email, password)

  const [res] = await db.query<ResultSetHeader>(addUserSQL, { ..._user })
  const [user] = await db.query<UserDB>(getUserSQL, { id: res.insertId })

  return {
    data: await userWithToken(user[0], event),
  }
})
