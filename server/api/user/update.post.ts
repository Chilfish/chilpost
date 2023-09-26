import type { ResultSetHeader } from 'mysql2'
import db from '@db'
import { upUser } from '@db/queries'
import type { User } from '~/types'

export default defineEventHandler(async (event) => {
  const newUser = await readBody<User>(event)

  const [row] = await db.execute<ResultSetHeader>(upUser, { ...newUser })

  return newReturn({
    count: row.affectedRows,
  })
})
