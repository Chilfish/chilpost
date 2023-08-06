import type { User } from '~/types/user'
import { delay } from '~/utils'

export default defineEventHandler(async (event) => {
  await delay(500)
  const newUser = await readBody<User>(event)
  const index = users.findIndex(u => u.id === newUser.id)
  // console.log('update user', newUser, index)
  if (index === -1)
    return { result: false, message: 'User not found' }

  users[index] = newUser
  return { result: true }
})
