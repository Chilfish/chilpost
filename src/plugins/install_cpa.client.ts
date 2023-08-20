import components from '@cpa'

export default defineNuxtPlugin((nuxtApp) => {
  const installer = makeInstaller([...components])
  nuxtApp.vueApp.use(installer)
})
