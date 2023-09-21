import { newError } from '../error'

export default defineEventHandler(async (event) => {
  const path = event.path.replace(/\?.+/g, '')

  const whiteList = [
    '/api/auth/**',
    '/api/post',
    '/api/post/search',
  ]
  const authList = [
    '/api/**',
  ]

  const toReg = (str: string) => new RegExp(`^${str.replace(/\*/g, '.*')}$`)

  const needAuth = !whiteList.map(toReg).some(item => item.test(path))
    && authList.map(toReg).some(item => item.test(path))

  const token = getHeader(event, 'Authorization')?.split(' ')?.[1]
    || getCookie(event, 'token')
    || ''

  const { id } = await verifyToken(token)
  const user = await getUserById(id)

  if (!user && needAuth)
    return newError('unauthorized')

  event.context.user = user
})
