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

  if (whiteList.map(toReg).some(item => item.test(path))
    || !authList.map(toReg).some(item => item.test(path))
  )
    return

  const user = await getUserFromSession(event)

  if (!user)
    return newError('unauthorized')

  event.context.user = user
})
