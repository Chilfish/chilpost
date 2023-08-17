import fs from 'node:fs/promises'
import path from 'node:path'
import dayjs from 'dayjs'
import { fakerDE as fake } from '@faker-js/faker'
import { v4 as uuid } from 'uuid'

import { randomPick } from '../../src/utils'
import type { Id, Post, UserAuth } from '~/types'

const user_num = 10
const post_num = 20

const uids = Array.from({ length: user_num }, () => uuid())

function randomNum(min = 0, max = 5000) {
  return fake.number.int({ min, max })
}

function genUser(
  id = uuid(),
  nick_name = fake.internet.userName().replace('.', '_'),
  email = fake.internet.email(),
  password = fake.internet.password(),
): UserAuth {
  return {
    id,
    email,
    password,
    bio: fake.lorem.paragraphs(1),
    nick_name: nick_name.replace(/[_]/g, ' '),
    name: nick_name.toLowerCase(),
    avatar: fake.internet.avatar(),
    createdAt: fake.date.past().toISOString(),
    status: {
      post_count: 0,
      follower_count: 0,
      following_count: 0,
      followers: [] as Id[],
      following: [] as Id[],
    },
  }
}

function genPost(owner_id: Id): Post {
  return {
    id: uuid(),
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

const fakeUsers = [
  ...uids.map(uid => genUser(uid)),
  genUser(uuid(), 'Chilfish', 'me@chilfish.top', 'password'),
]

const fakePosts = Array.from({ length: post_num },
  () => {
    const user = randomPick(fakeUsers)
    user.status.post_count += 1
    return genPost(user.id)
  },
).sort((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix())

const mockDir = path.resolve(path.resolve(), 'server/utils/_mock.ts')

// generate static mock data to ts file
async function generateStatic(...mocks: { name: string; type: string; data: any[] }[]) {
  const output = mocks
    .map(mock => `export const ${mock.name}: ${mock.type} = ${JSON.stringify(mock.data)};`)
    .join('\n')

  await fs.writeFile(mockDir, `${output}\n`)
}

export default function genStaticData() {
  return generateStatic(
    { name: 'fakeUsers', type: 'UserAuth[]', data: fakeUsers },
    { name: 'fakePosts', type: 'Post[]', data: fakePosts },
  )
}
