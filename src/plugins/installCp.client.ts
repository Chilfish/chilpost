import Components from '~/appCP'

export default defineNuxtPlugin((nuxtApp) => {
  const installer = makeInstaller([...Components])
  nuxtApp.vueApp.use(installer)
})
