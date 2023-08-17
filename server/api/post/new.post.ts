import type { ApiResult, PostDetail, PostMeta, User } from '~/types'

interface Body {
  content: string
  meta: PostMeta
}

export default defineEventHandler(async (event): ApiResult<PostDetail> => {
  const { content, meta } = await readBody(event) as Body
  const user = event.context.user as User
  if (!user) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const { type: postType, pcId } = meta
  const post = newPost(user.id, content, postType === 'new')
  user.status.post_count++

  // just new a post
  if (postType === 'new') {
    fakePosts.unshift(post)

    return {
      data: toDetail(post),
    }
  }

  // comment or repost
  const pcPost = fakePosts.find(post => post.id === pcId)

  if (!pcPost) {
    return createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: `Post ${pcId} not found.`,
    })
  }

  if (postType === 'comment') {
    pcPost.status.comment_count++
    pcPost.status.comments.unshift(post.id)
    post.parentId = pcId
    post.parentPost = toDetail(pcPost)
  }
  else if (postType === 'repost') {
    pcPost.status.repost_count++
    pcPost.status.reposts.unshift(post.id)
  }

  fakePosts.unshift(post)

  return {
    data: toDetail(post),
  }
})
