import db from '@db'
import type { PostDB, User, UserDB } from '~/types'
import { getPostByOwner, getUserByName } from '~~/database/queries'

export default defineEventHandler(async (event) => {
  const { name } = event.context.params as { name: string }

  assertParams({ name })

  const [rows] = await db.query<UserDB>(getUserByName, { name })
  const owner = rows[0] as User

  const [posts] = await db.query<PostDB>(getPostByOwner, {
    owner_id: owner.id,
  })

  return {
    data: {
      owner,
      posts,
    },
  }
})
