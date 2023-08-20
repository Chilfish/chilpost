import { createVNode, render } from 'vue'
import type { AppContext } from 'vue'
import type { ToastFn, ToastHandler, ToastInstance, ToastOptions, ToastParams, ToastParamsNormalized } from './types'
import ToastConstructor from './Toast.vue'
import { toastDefault } from './props'
import { instances, rmInstance } from './instance'

let id_ = 0

/**
 * convert options to normalized options
 */
function normalizeOptions(params?: ToastParams): ToastParamsNormalized {
  const options: ToastOptions
  = typeof params === 'string' || !params
    ? { message: params }
    : params

  const normalized = {
    ...toastDefault,
    ...options,
  }

  if (!isClient) {
    normalized.appendTo = (undefined as never)
    return normalized as ToastParamsNormalized
  }

  if (!normalized.appendTo) {
    normalized.appendTo = document.body
  }
  else if (typeof normalized.appendTo === 'string') {
    let appendTo = document.querySelector<HTMLElement>(normalized.appendTo)
    if (!appendTo)
      appendTo = document.body
    normalized.appendTo = appendTo
  }

  return normalized as ToastParamsNormalized
}

// The toast function creates a new toast instance and returns its handler.
export const toast: ToastFn & Partial<ToastFn> & { _context: AppContext | null } = (
  options = {},
  context,
) => {
  const norOptions = normalizeOptions(options)
  const instance = createToast(norOptions, context)

  instances.push(instance)
  return instance.handler
}

function createToast(
  { appendTo, ...options }: ToastParamsNormalized,
  context?: AppContext | null,
): ToastInstance {
  const container = document.createElement('div')
  const id = `toast-${id_++}`

  const props = {
    ...options,
    id,
    onClose: () => {
      options.onClose?.()
      rmInstance(id)
    },
    onDestroy: () => {
      render(null, container) // The container will be removed from the body
    },
  }

  const vnode = createVNode(ToastConstructor, props)
  vnode.appContext = context || toast._context

  render(vnode, container) // Render as HTML

  // When destroyed, gc will automatically recycle this div
  appendTo.appendChild(container.firstElementChild!)

  const vm = vnode.component!

  const handler: ToastHandler = {
    close() {
      vm.exposed!.close()
    },
  }

  const instance: ToastInstance = {
    id,
    vm,
    handler,
    vnode,
    props: (vnode.component as any).props,
  }

  return instance
}

toast._context = null

export default toast as ToastFn
