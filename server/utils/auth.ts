import * as jose from 'jose'
import type { H3Event } from 'h3'
import { getUserById } from '.'

const { apiSecret, apiUrl } = useRuntimeConfig()

const secret = new TextEncoder().encode(apiSecret)

const issuer = apiUrl
const audience = 'Chilpost'

export async function createToken(payload: any) {
  return new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime('12h')
    .sign(secret)
}

export async function verifyToken(token: string) {
  return jose.jwtVerify(token, secret, {
    issuer,
    audience,
  })
}

export async function getUserFromSession(event: H3Event) {
  const cookie = getCookie(event, 'token')

  if (!cookie)
    return null

  try {
    const { payload } = await verifyToken(cookie)

    return getUserById((payload as { id: string }).id)
  }
  catch (error) {
    return null
  }
}
