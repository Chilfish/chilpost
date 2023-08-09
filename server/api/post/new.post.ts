import type { ApiResult, PostDetail, User } from '~/types'

interface Body {
  content: string
}

export default defineEventHandler(async (event): ApiResult<PostDetail> => {
  const { content } = await readBody(event) as Body
  const user = event.context.user as User
  if (!user) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const post = newPost(user.id, content)
  fakePosts.unshift(post)

  return {
    data: toDetail(post),
  }
})
