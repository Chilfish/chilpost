import db from '@db'
import { getUserByNameSQL, getUserSQL } from '@db/user'
import type { UserDB } from '~/types'

interface QueryParams {
  id?: string
  ownerName?: string
}

export default defineEventHandler(async (event) => {
  const {
    id,
    ownerName,
  } = getQuery(event) as QueryParams

  if (id) {
    return {
      data: await byId(id),
    }
  }

  if (ownerName) {
    return {
      data: await byOwnerName(ownerName),
    }
  }

  return {
    data: null,
  }
})

async function byId(id: string) {
  const post = fakePosts.find(post => post.id === id)
  if (!post)
    throw newError('notfound_post')

  const [row] = await db.query<UserDB>(getUserSQL, { id: post.owner_id })
  const owner = row[0]

  return toDetail(post, owner)
}

async function byOwnerName(owner_name: string) {
  const [row] = await db.query<UserDB>(getUserByNameSQL, { name: owner_name })
  const owner = row[0]
  if (!owner)
    throw newError('notfound_user')

  const posts = fakePosts.filter(post => post.owner_id === owner.id)
  const { email: _e, created_at: _c, password: _p, ...res } = owner
  return {
    owner: res,
    posts,
  }
}
