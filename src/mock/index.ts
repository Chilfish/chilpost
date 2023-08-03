import dayjs from 'dayjs'
import { fakerDE as fake } from '@faker-js/faker'
import { generatePost } from './posts'
import { generateUser } from './users'

export const randomNum = (min = 0, max = 5000) => fake.number.int({ min, max })

const user_num = 10
const post_num = 20

export const fakeUsers = Array.from({ length: user_num }, () => generateUser())

export const fakePosts = Array.from({ length: post_num },
  () => generatePost(
    fakeUsers[randomNum(0, user_num - 1)].id,
  ),
).sort((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix())
