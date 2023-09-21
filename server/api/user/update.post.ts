import { delay } from '~/utils'
import type { User, UserAuth } from '~/types'

export default defineEventHandler(async (event) => {
  await delay(500)
  const oldUser = event.context.user as UserAuth

  const newUser = await readBody<User>(event)

  Object.assign(oldUser, newUser)

  return { data: true }
})
