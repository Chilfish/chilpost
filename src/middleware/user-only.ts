export default defineNuxtRouteMiddleware(async () => {
  // 要等客户端获取用户信息后再判断
  if (process.server)
    return

  const userStore = useUserStore()
  if (!userStore.isFetched) {
    console.log('fetch me middleware')
    await userStore.fetchMe()
  }

  userStore.isFetched = true

  if (!userStore.curUser?.name)
    return navigateTo({ name: 'explore' })
})
