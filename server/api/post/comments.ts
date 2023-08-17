import type { pid } from '~/types'

export default defineEventHandler(async (event) => {
  const { commentIds } = await readBody(event) as { commentIds: pid[] }

  const comments = commentIds.map((id) => {
    const comment = fakePosts.find(post => post.id === id)
    if (!comment) {
      throw createError({
        statusCode: 404,
        statusMessage: `Comment not found. Id: ${id}`,
      })
    }
    return toDetail(comment)
  })

  return {
    data: comments,
  }
})
