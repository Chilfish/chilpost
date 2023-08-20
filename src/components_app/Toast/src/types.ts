import type { AppContext, ComponentInternalInstance, ExtractPropTypes, VNode } from 'vue'
import type { toastProps } from './props'

export type ToastType = 'info' | 'success' | 'warning' | 'error'

export type ToastProps = ExtractPropTypes<
  Omit<typeof toastProps, 'type'> & {
    readonly type?: ToastType // This is to convert the string type to the above types.
  }
>

// Exclude id from props and make all of them optional.
// appendTo is specified in createVNode, not in Toast.vue,
// so it needs to be specified separately, which is also optional.
export type ToastOptions = Partial<Omit<ToastProps, 'id'>> & {
  /**
   * @deprecated default is document.body
   */
  appendTo?: HTMLElement
}

// Toast parameters, string or options object.
export type ToastParams = ToastOptions | ToastOptions['message']

// To be able to parse pure string into the original default options object.
// All of them are required here.
export type ToastParamsNormalized = Omit<ToastProps, 'id'> & {
  appendTo: HTMLElement
}

// The return of the Toast function, in order to allow the caller to close it manually in advance.
export interface ToastHandler {
  close(): void
}

// The body of the Toast function.
export interface ToastFn {
  (options?: ToastParams, context?: AppContext | null): ToastHandler
}

// Instance containing Toast information.
export interface ToastInstance {
  id: string
  props: ToastProps
  /**
   * @description The Toast.vue component itself, in order to get some information from it.
   * such as height and offset, so that the Toasts can be arranged in position rather than stacked on top of each other
   */
  vm: ComponentInternalInstance
  vnode: VNode
  handler: ToastHandler
}
