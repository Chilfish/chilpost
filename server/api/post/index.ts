export default defineEventHandler((event) => {
  return fakePosts.map(toDetail)
  // return createError({
  //   statusCode: 404,
  //   statusMessage: 'Post not found',
  // })
})
