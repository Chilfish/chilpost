import type { ToastContext } from './types'
import { toastDefault } from './props'

export const instances: ToastContext[] = shallowReactive([])

export function getInstance(id: string) {
  const idx = instances.findIndex(item => item.id === id)
  const curr = instances[idx]
  let prev: ToastContext | undefined
  if (idx > 0)
    prev = instances[idx - 1]

  return { curr, prev }
}

export function rmInstance(id: string) {
  const idx = instances.findIndex(item => item.id === id)
  if (idx === -1)
    return
  instances[idx].handler.close()
  instances.splice(idx, 1)
}

export function getLastOffset(id: string) {
  const { prev } = getInstance(id)
  if (!prev)
    return toastDefault.offset
  return prev.vm.exposed!.bottom.value
}

export function getOffsetOrSpace(id: string, offset: number) {
  const idx = instances.findIndex(item => item.id === id)
  return idx > 0 ? toastDefault.offset : offset
}
