import type { AppContext, ComponentInternalInstance, ExtractPropTypes, VNode } from 'vue'
import type { toastProps } from './props'

export type ToastType = 'info' | 'success' | 'warning' | 'error'

export type ToastProps = ExtractPropTypes<Omit<typeof toastProps, 'type'> & {
  readonly type?: ToastType
}>

export type ToastOptions = Partial<Omit<ToastProps, 'id'>> & {
  appendTo?: HTMLElement
}

export type ToastParams = ToastOptions | ToastOptions['message']

export type ToastParamsNormalized = Omit<ToastProps, 'id'> & {
  appendTo: HTMLElement
}

export interface ToastHandler {
  close(): void
}

export interface ToastFn {
  (options?: ToastParams, context?: AppContext | null): ToastHandler
}

export interface ToastContext {
  id: string
  props: ToastProps
  vm: ComponentInternalInstance
  vnode: VNode
  handler: ToastHandler
}
