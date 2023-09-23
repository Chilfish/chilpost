import type { NewPostBody, UserAuth } from '~/types'

export default defineEventHandler(async (event) => {
  const { content, meta } = await readBody(event) as NewPostBody
  const user = event.context.user as UserAuth

  const { type: postType, pcId } = meta
  const post = newPost(user.id, content, postType === 'post')
  user.post_count++

  // just new a post
  if (postType === 'post') {
    fakePosts.unshift(post)

    return {
      data: toDetail(post, user),
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
    post.parentPost = toDetail(pcPost, user)
  }
  else if (postType === 'repost') {
    pcPost.status.repost_count++
    pcPost.status.reposts.unshift(post.id)
  }

  fakePosts.unshift(post)

  return {
    data: toDetail(post, user),
  }
})
