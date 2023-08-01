import dayjs from 'dayjs'
import { generatePost } from './posts'
import { generateUser } from './users'

export const users = Array.from({ length: 10 }, () => generateUser())

export const posts = Array.from({ length: 20 },
  () => generatePost(
    users[Math.floor(Math.random() * users.length)],
  ),
).toSorted((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix())
