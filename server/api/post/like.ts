import type { UserAuth } from '~/types'

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event) as { id: string }
  const post = fakePosts.find(post => post.id === id)

  if (!post)
    return newError('notfound_post')

  const user = event.context.user as UserAuth

  const likes = post.status.likes
  const index = likes.findIndex(like => like === user.id)
  if (index === -1)
    likes.push(user.id)
  else
    likes.splice(index, 1)
  post.status.like_count = likes.length

  return { data: likes }
})
