export const useDarkStore = defineStore('dark', () => {
  const isDark = useDark({
    valueLight: 'light',
    valueDark: 'dark',
  })
  const toggle = useToggle(isDark)
  const icon = computed(() =>
    isDark.value ? 'i-tabler-sun' : 'i-tabler-moon',
  )

  return {
    isDark,
    toggle,
    icon,
  }
})
