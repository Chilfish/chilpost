import type { ApiResult } from '~/types'
import { delay } from '~/utils'

interface QueryParams {
  id?: string
  curId?: string
}

export default defineEventHandler(async (event): Promise<ApiResult> => {
  await delay(500)

  const { id, curId } = getQuery(event) as QueryParams
  const user = fakeUsers.find(user => user.id === id)
  const curUser = fakeUsers.find(user => user.id === curId)
  if (!user || !curUser)
    return { message: 'User not found', result: false }

  const isFollowing = user.status.is_following ? -1 : 1

  user.status.follower_count += isFollowing
  curUser.status.following_count += isFollowing

  user.status.is_following = !user.status.is_following

  return {
    result: true,
  }
})
