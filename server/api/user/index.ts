import { users } from '../_mock.js'

export default defineEventHandler(async (event) => {
  return users
})
