export default defineNuxtRouteMiddleware(async () => {
  const userStore = useUserStore()

  if (!userStore.curUser) {
    const res = await userStore.setCurUser()
    if (res?.statusCode === 401)
      return navigateTo({ name: 'index' })
  }
})
