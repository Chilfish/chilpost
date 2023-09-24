import db from '@db'
import { getUser } from '@db/queries/user'
import { newError } from '../error'
import type { UserDB } from '~/types'

export default defineEventHandler(async (event) => {
  const path = event.path.replace(/\?.+/g, '')

  const whiteList = [
    '/auth/**',
    '/post/all',
    '/post/get',
    '/post/comments',
    '/user/@*',
  ]

  const authList = [
    '/api/**',
  ]

  const adminList = [
    '/user/all',
  ]

  const toReg = (str: string) => new RegExp(`${str.replace(/\*/g, '.*')}$`)

  let [noNeedAuth, isAdminRoute, needAuth] = [whiteList, adminList, authList]
    .map(list => list.map(toReg)
      .some(item => item.test(path)),
    )

  needAuth = needAuth && !noNeedAuth

  // console.log({ noNeedAuth, isAdminRoute, path, needAuth })

  if (!needAuth)
    return

  const token = getHeader(event, 'Authorization')?.split(' ')?.[1]
    || getCookie(event, 'token')
    || ''

  const { id } = await verifyToken(token)
  const [res] = await db.query<UserDB>(getUser, { id })
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
