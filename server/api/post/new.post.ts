interface Body {
  ownerId: string
  content: string
}

export default defineEventHandler(async (event) => {
  const { ownerId, content } = await readBody(event)
  const post = newPost(ownerId, content)
  fakePosts.unshift(post)
  return post
})
