export const useDarkStore = defineStore('dark', () => {
  const isDark = useDark()
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
