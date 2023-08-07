import { delay } from '~/utils'
import type { User } from '~/types'

export default defineEventHandler(async (event) => {
  await delay(500)
  const newUser = await readBody<User>(event)
  const oldUser = fakeUsers.find(u => u.id === newUser.id)
  if (!oldUser) {
    return createError({
      status: 404,
      message: 'User not found',
    })
  }

  Object.assign(oldUser, newUser)

  return { result: true }
})
