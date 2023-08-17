import type { User } from '~/types'

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event) as { id: string }
  const post = fakePosts.find(post => post.id === id)
  if (!post) {
    return createError({
      statusCode: 404,
      message: 'Post not found',
    })
  }

  const user = event.context.user as User
  if (!user) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const likes = post.status.likes
  const index = likes.findIndex(like => like === user.id)
  if (index === -1)
    likes.push(user.id)
  else
    likes.splice(index, 1)
  post.status.like_count = likes.length

  return { data: likes }
})
