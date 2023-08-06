export default defineEventHandler((event) => {
  return posts.map(toDetail)
})
