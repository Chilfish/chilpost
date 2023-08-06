export default defineEventHandler(async (event) => {
  const { postId } = getQuery(event) as { postId: string }
  const post = posts.find(post => post.id === postId)
  if (!post)
    return { result: false, message: 'Post not found' }

  // TODO
})
