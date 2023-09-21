import { delay } from '~/utils'
import type { ApiResult, User, UserAuth } from '~/types'

export default defineEventHandler(async (event): ApiResult => {
  await delay(500)
  const oldUser = event.context.user as UserAuth

  const newUser = await readBody<User>(event)

  Object.assign(oldUser, newUser)

  return { data: true }
})
