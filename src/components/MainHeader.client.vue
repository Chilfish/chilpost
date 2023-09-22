<script setup lang="ts">
const { y } = useWindowScroll()
const isScrollingDown = ref(false)
watch(
  () => y.value,
  (newY, oldY) => {
    isScrollingDown.value = newY > oldY
  },
)

const darkStore = useDarkStore()
</script>

<template>
  <header
    :class="isScrollingDown ? 'scroll-up' : ''"
    class="blur-bg"
  >
    <h2>Explore</h2>

    <label>
      <span class="icon i-tabler-search" />
      <input type="search" placeholder="Search">
    </label>

    <div>
      <NuxtLink
        to="https://github.com/Chilfish/chilpost"
        external
        target="_blank"
      >
        <span class="icon i-tabler-brand-github" />
      </NuxtLink>

      <span
        class="icon"
        :class="darkStore.icon"
        @click="darkStore.toggle()"
      />
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use "~/assets/index/header";
</style>
