export default defineNuxtRouteMiddleware(async () => {
  const userStore = useUserStore()

  if (!userStore.curUser)
    return navigateTo({ name: 'index' })
})
