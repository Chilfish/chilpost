import { shallowReactive } from 'vue'
import type { ToastInstance } from './types'
import { toastDefault } from './props'

export const instances: ToastInstance[] = shallowReactive([])

export function getInstance(id: string) {
  const idx = instances.findIndex(item => item.id === id)
  const curr = instances[idx]
  let prev: ToastInstance | undefined
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
  return prev.vm.exposed!.bottom.value // from Toast.vue defineExpose
}

export function getOffsetOrSpace(id: string, offset: number) {
  const idx = instances.findIndex(item => item.id === id)
  return idx > 0 ? toastDefault.offset : offset
}
