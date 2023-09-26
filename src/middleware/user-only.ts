export default defineNuxtRouteMiddleware(async () => {
  const userStore = useUserStore()

  if (!userStore.curUser?.name)
    return navigateTo({ name: 'index' })
})
