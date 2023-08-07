interface QueryParams {
  id?: string
  name?: string
}

export default defineEventHandler((event) => {
  const {
    id,
    name,
  } = getQuery(event) as QueryParams

  try {
    const user = fakeUsers.find(user => user.id === id || user.name === name)
    if (!user) {
      return createError({
        status: 404,
        message: 'User not found',
      })
    }
    return user
  }
  catch (err: any) {
    return { message: err.message }
  }
})
