import { Buffer } from 'node:buffer'
import { CompactSign, compactVerify } from 'jose'
import type { H3Event } from 'h3'

import { alg, getKeys } from './keys'
import { TOKEN_EXP } from '~/constants'
import type { UserAuth, UserWithToken, uid } from '~/types'

const { ecPrivateKey, ecPublicKey } = await getKeys()

export async function createToken(payload: any) {
  return await new CompactSign(
    Buffer.from(JSON.stringify(payload), 'utf8'),
  )
    .setProtectedHeader({ alg, exp: TOKEN_EXP })
    .sign(ecPrivateKey)
}

export async function verifyToken(token: string) {
  const { payload } = await compactVerify(token, ecPublicKey)

  return JSON.parse(payload.toString()) as {
    id: uid
    name: string
  }
}

export async function userWithToken(
  user: UserAuth,
  event: H3Event,
): Promise<UserWithToken> {
  const { password: _pass, ...userWithoutPass } = user

  const token = await createToken({ id: user.id, name: user.name })

  setCookie(event, 'token', token)

  return {
    user: userWithoutPass,
    token,
  }
}
