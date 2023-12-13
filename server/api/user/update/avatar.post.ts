import type { UserAuth } from '~/types'

export default defineEventHandler(async (event) => {
  const avatarBlob = (await readFormData(event)).get('avatar') as Blob

  const user = event.context.user as UserAuth

  return newReturn({
    url: `/avatars/${user.id}.png`,
    size: avatarBlob.size,
  })
})
