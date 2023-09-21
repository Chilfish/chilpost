import type { UserAuth } from '~/types'
import { toggleFollow } from '~/utils'

interface QueryParams {
  id?: string
  curId?: string
}

export default defineEventHandler(async (event) => {
  const curUser = event.context.user as UserAuth

  const { id } = getQuery(event) as QueryParams
  const user = fakeUsers.find(user => user.id === id)

  if (!user)
    return newError('notfound_user')

  if (curUser.id === user.id)
    return newError('conflict_follow')

  await toggleFollow(curUser, user)

  return {
    data: true,
  }
})
