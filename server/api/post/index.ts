import type { ApiResult } from '~/types'

export default defineEventHandler(async (event): ApiResult => {
  return {
    data: fakePosts.filter(post => post.isBody).map(toDetail),
  }
  // return createError({
  //   statusCode: 404,
  //   statusMessage: 'Post not found',
  // })
})
