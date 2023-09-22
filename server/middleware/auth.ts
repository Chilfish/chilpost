import db from '@db'
import { getUserSQL } from '@db/user'
import { newError } from '../error'
import type { UserDB } from '~/types'

export default defineEventHandler(async (event) => {
  const path = event.path.replace(/\?.+/g, '')

  const whiteList = [
    '/auth/**',
    '/post',
    '/post/search',
    '/post/comment',
  ]

  const adminList = [
    '/user/all',
  ]

  const toReg = (str: string) => new RegExp(`${str.replace(/\*/g, '.*')}$`)

  const noNeedAuth = whiteList.map(toReg).some(item => item.test(path))

  const isAdminRoute = adminList.map(toReg).some(item => item.test(path))

  if (noNeedAuth)
    return

  const token = getHeader(event, 'Authorization')?.split(' ')?.[1]
    || getCookie(event, 'token')
    || ''

  const { id } = await verifyToken(token)
  const [res] = await db.query<UserDB>(getUserSQL, { id })
  const user = res[0]

  if (!user)
    return newError('unauthorized')

  if (isAdminRoute && user.level !== 'admin')
    return newError('not_admin')

  event.context = {
    ...event.context,
    user,
    uid: user.id,
    level: user.level,
  }
})
