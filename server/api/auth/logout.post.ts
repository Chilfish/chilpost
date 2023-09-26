export default defineEventHandler(async (event) => {
  deleteCookie(event, 'token', {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: !isDev,
  })

  return newReturn(
    111,
    'logout success',
  )
})
