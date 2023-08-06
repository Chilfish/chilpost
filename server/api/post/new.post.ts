import { newPost } from '../../utils'

interface Body {
  ownerId: string
  content: string
}

export default defineEventHandler(async (event) => {
  const { ownerId, content } = await readBody(event)
  const post = newPost(ownerId, content)
  posts.unshift(post)
  return post
})
