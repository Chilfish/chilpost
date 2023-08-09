import type { ApiResult } from '~/types'

interface QueryParams {
  id?: string
  name?: string
}

export default defineEventHandler(async (event): ApiResult => {
  const {
    id,
    name,
  } = getQuery(event) as QueryParams

  try {
    const user = fakeUsers.find(user => user.id === id || user.name === name)
    if (!user) {
      return createError({
        status: 404,
        statusMessage: 'User not found',
      })
    }
    return { data: user }
  }
  catch (err: any) {
    return createError({
      status: 500,
      statusMessage: err.message,
    })
  }
})
