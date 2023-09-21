export default defineEventHandler(async (event) => {
  return {
    data: fakePosts.filter(post => post.isBody).map(toDetail),
  }
})
