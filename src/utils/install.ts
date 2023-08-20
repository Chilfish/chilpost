import type { App, Plugin } from 'vue'
import type { SFCInstallWithContext, SFCWithInstall } from './types'
import { INSTALLED_KEY } from '~/constants'

/**
 * add install method to a component to register it globally
 * @param main the component (SFC.vue)
 * @param extra extra components to register, and should add a noop install method to them
 * @returns the component with install method
 */
export function withInstall<T, E extends Record<string, any>>(
  main: T,
  extra?: E,
) {
  (main as SFCWithInstall<T>).install = (app: App) => {
    for (const comp of [main, ...Object.values(extra ?? {})])
      app.component(comp.name, comp)
  }

  if (extra) {
    for (const [key, comp] of Object.entries(extra))
      (main as any)[key] = comp
  }
  return main as SFCWithInstall<T> & E
}

/**
 * @description add a function as a globalProperties and installable
 */
export function withInstallFunction<T>(fn: T, name: string) {
  const fnWithContext = fn as SFCInstallWithContext<T>

  (fn as SFCWithInstall<T>).install = (app: App) => {
    fnWithContext._context = app._context
    app.config.globalProperties[name] = fn // use $name to access the function
  }

  return fnWithContext
}

/**
 * add a noop install method to a component
 */
export function withNoopInstall<T>(component: T) {
  const cp = component as SFCWithInstall<T>
  cp.install = () => { }

  return cp
}

/**
 * Create a component installer that installs all the components
 * @param components the components or plugins to install
 * @returns the plugin installer
 */
export function makeInstaller(components: Plugin[] = []) {
  return {
    install(app: App) {
      // already installed the plugin
      if ((this as any)[INSTALLED_KEY])
        return
      (this as any)[INSTALLED_KEY] = true

      // install all components
      components.forEach((component) => {
        app.use(component)
      })
    },
  }
}
