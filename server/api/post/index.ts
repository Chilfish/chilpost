export default defineEventHandler((event) => {
  return fakePosts.map(toDetail)
})
