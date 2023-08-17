export default defineNuxtRouteMiddleware(async () => {
  const userStore = useUserStore()

  if (!userStore.curUser) {
    const res = await userStore.me()
    if (!res)
      return navigateTo({ name: 'index' })
  }
})
