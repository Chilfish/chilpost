export const definePropType = <T>(val: any): PropType<T> => val

export const toastDefault = {
  appendTo: isClient ? document.body : (undefined as never),
  id: '',
  message: '',
  offset: 16,
  onClose: undefined,
  type: 'info',
} as const

export const toastProps = {
  id: {
    type: String,
    default: toastDefault.id,
  },

  message: {
    type: String,
    default: toastDefault.message,
  },

  offset: {
    type: Number,
    default: toastDefault.offset,
  },

  type: {
    type: String,
    default: toastDefault.type,
  },

  onClose: {
    type: definePropType<() => void>(Function),
  },

  onDestroy: {
    type: definePropType<() => void>(Function),
  },
} as const
