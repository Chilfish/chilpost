import { components } from '~/components'

export default defineNuxtPlugin((nuxtApp) => {
  const installer = makeInstaller([...components])
  nuxtApp.vueApp.use(installer)
})
