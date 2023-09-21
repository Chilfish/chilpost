import type { PostMeta, User } from '~/types'

interface Body {
  content: string
  meta: PostMeta
}

export default defineEventHandler(async (event) => {
  const { content, meta } = await readBody(event) as Body
  const user = event.context.user as User

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

  if (!pcPost)
    return newError('notfound_post')

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
