import type { pid } from '~/types'

export default defineEventHandler(async (event) => {
  const { commentIds } = await readBody(event) as { commentIds: pid[] }

  const comments = commentIds.map((id) => {
    const comment = fakePosts.find(post => post.id === id)

    if (!comment) {
      throw new MyError({
        message: `Comment not found. Id: ${id}`,
        code: 'notfound_comment',
      })
    }
    return toDetail(comment)
  })

  return {
    data: comments,
  }
})
