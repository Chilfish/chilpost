import type { ApiResult } from '~/types'

export default defineEventHandler(async (event): ApiResult => {
  return {
    data: fakePosts.filter(post => post.isBody).map(toDetail),
  }
})
