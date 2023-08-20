import type { AppContext, Plugin } from 'vue'

/**
 * @description mark a component as installable
 */
export type SFCWithInstall<T> = T & Plugin

/**
 * @description mark a function as installable and add a context property
 */
export type SFCInstallWithContext<T> = SFCWithInstall<T> & {
  _context: AppContext | null
}
