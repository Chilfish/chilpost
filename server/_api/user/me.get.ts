import type { UserAuth } from '~/types'

export default defineEventHandler(async (event) => {
  const user = event.context.user as UserAuth

  return newReturn(user)
})
