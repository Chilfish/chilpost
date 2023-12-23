export function useScrollRatio() {
  const { x, y } = useWindowScroll()
  const { width, height } = useWindowSize()

  const fmt = (n: number) => Number(n.toFixed(3))

  const ratioY = computed(() => fmt(
    y.value / (document.body.scrollHeight - height.value + 0.001),
  ))

  const ratioX = computed(() => fmt(
    x.value / (document.body.scrollWidth - width.value + 0.001),
  ))

  return {
    ratioY,
    ratioX,
    percentY: computed(() => `${(ratioY.value * 100).toFixed(0)}%`),
    percentX: computed(() => `${(ratioX.value * 100).toFixed(0)}%`),
  }
}
