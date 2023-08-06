export default defineEventHandler((event) => {
  const curUser = users.find(user => user.name === 'chilfish') // mock
  if (!curUser)
    return { message: 'User not found' }

  return curUser
})
