import type { ApiResult } from '~/types'

interface Body {
  ownerId: string
  content: string
}

export default defineEventHandler(async (event): ApiResult => {
  const { ownerId, content } = await readBody(event)
  const post = newPost(ownerId, content)
  fakePosts.unshift(post)

  return {
    data: post,
  }
})
