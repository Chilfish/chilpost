export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const userStore = useUserStore()
  useDarkStore()

  // get user info from server, in SSR mode
  if (!userStore.curUser?.name)
    await userStore.fetchMe()
})
