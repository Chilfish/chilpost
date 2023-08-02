import dayjs from 'dayjs'
import { generatePost } from './posts'
import { generateUser } from './users'

export const fakeUsers = Array.from({ length: 10 }, () => generateUser())

export const fakePosts = Array.from({ length: 20 },
  () => generatePost(
    fakeUsers[Math.floor(Math.random() * fakeUsers.length)],
  ),
).toSorted((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix())
