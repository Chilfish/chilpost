import type { ResultSetHeader } from 'mysql2'
import db from '@db'
import { upUser } from '@db/queries'
import type { User } from '~/types'

/**
 * 更新用户信息
 */
export default defineEventHandler(async (event) => {
  const newUser = await readBody<User>(event)

  const [row] = await db.execute<ResultSetHeader>(upUser, { ...newUser })

  return newReturn({
    count: row.affectedRows,
  })
})
