import dayjs from 'dayjs'
import { fakerDE as fake } from '@faker-js/faker'
import { generatePost } from './posts'
import { generateUser } from './users'

export const randomNum = (min = 0, max = 5000) => fake.number.int({ min, max })

export const fakeUsers = Array.from({ length: 10 }, () => generateUser())

export const fakePosts = Array.from({ length: 20 },
  () => generatePost(
    fakeUsers[randomNum(0, fakeUsers.length - 1)],
  ),
).sort((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix())
