export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore()
  useDarkStore()

  // get user info from server, in SSR mode
  if (!userStore.curUser?.name)
    await userStore.fetchMe()
})
