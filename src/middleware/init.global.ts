export default defineNuxtRouteMiddleware(async (_to, _from) => {
  useDarkStore()

  // const userStore = useUserStore()
  // get user info from server, in SSR mode
  // if (!userStore.curUser?.name)
  // await userStore.fetchMe()
})
