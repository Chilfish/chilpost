import fs from 'node:fs/promises'
import path from 'node:path'
import dayjs from 'dayjs'
import { fakerDE as fake } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'
import type { Id, Post, User } from '~/types'

function genUser(
  nick_name = fake.internet.userName().replace('.', '_'),
): User {
  return {
    id: uuidv4(),
    bio: fake.lorem.paragraphs(1),
    nick_name: nick_name.replace(/[_]/g, ' '),
    name: nick_name.toLowerCase(),
    email: fake.internet.email(),
    avatar: fake.internet.avatar(),
    createdAt: fake.date.past().toISOString(),
    status: {
      follower_count: randomNum(),
      following_count: randomNum(),
      post_count: randomNum(),
      is_following: fake.datatype.boolean(),
    },
  }
}

function generatePost(owner_id: Id): Post {
  return {
    id: uuidv4(),
    owner_id,
    content: fake.lorem.paragraphs(randomNum(1, 4)),
    createdAt: fake.date.past().toISOString(),
    status: {
      like_count: randomNum(),
      comment_count: randomNum(),
      repost_count: randomNum(),
      is_liked: fake.datatype.boolean(),
    },
  }
}

const user_num = 10
const post_num = 20

function randomNum(min = 0, max = 5000) {
  return fake.number.int({ min, max })
}

const fakeUsers = [
  ...Array.from({ length: user_num }, () => genUser()),
  genUser('Chilfish'),
]

const fakePosts = Array.from({ length: post_num },
  () => generatePost(
    fakeUsers[randomNum(0, user_num - 1)].id,
  ),
).sort((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix())

const mockDir = path.resolve(path.resolve(), 'server/utils/_mock.ts')

// generate static mock data to ts file
async function generateStatic(...mocks: { name: string; data: any[] }[]) {
  const output = mocks
    .map(mock => `export const ${mock.name} = ${JSON.stringify(mock.data)};`)
    .join('\n')

  await fs.writeFile(mockDir, `${output}\n`)
}

function genStaticData() {
  return generateStatic(
    { name: 'users', data: fakeUsers },
    { name: 'posts', data: fakePosts },
  )
}

export default defineNuxtPlugin((nuxtApp) => {
  genStaticData()
})
