import { toDetail } from '../_utils'
import { posts } from '../_mock'

export default defineEventHandler((event) => {
  return posts.map(toDetail)
})
