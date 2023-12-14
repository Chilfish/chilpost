import { join } from 'node:path'
import { Buffer } from 'node:buffer'
import fs from 'fs-extra'
import db from '@db'
import type { ResultSetHeader } from 'mysql2'
import type { UserAuth } from '~/types'
import { isDev, rootDir } from '~~/server/utils'

export default defineEventHandler(async (event) => {
  const avatarBlob = (await readFormData(event)).get('avatar') as Blob

  if (!avatarBlob?.size)
    return newError('unknown error')

  const user = event.context.user as UserAuth
  const url = `/avatars/${user.id}.png`

  const avatarPath = join(rootDir, isDev ? 'src/public' : '.output/public')

  await fs.writeFile(`${avatarPath}${url}`, Buffer.from(await avatarBlob.arrayBuffer()))

  const [row] = await db.execute<ResultSetHeader>(
   `update users set avatar = :avatar where id = ${user.id}`,
   { avatar: url },
  )

  return newReturn({
    url,
    size: avatarBlob.size,
    res: row.affectedRows,
  })
})
