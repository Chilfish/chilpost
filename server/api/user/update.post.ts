import type { ResultSetHeader } from 'mysql2'
import db from '@db'
import { upUserSQL } from '@db/queries'
import type { User, UserAuth } from '~/types'

export default defineEventHandler(async (event) => {
  const oldUser = event.context.user as UserAuth

  const newUser = await readBody<User>(event)

  // ensure that the loss of other fields will be filled with the old data
  Object.assign(oldUser, newUser)

  const [res] = await db.execute<ResultSetHeader>(upUserSQL, { ...oldUser })

  return {
    data: {
      count: res.affectedRows,
    },
  }
})
