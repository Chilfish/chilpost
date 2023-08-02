<script setup lang="ts">
import { useDark, useScroll, useToggle } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const path = ref(route.path.replace('/', ''))

watch(
  () => route.path,
  (newPath) => {
    path.value = newPath.replace('/', '')
  },
)

const showHeader = computed(() => !path.value.includes('@'))

const isDark = useDark()
const toggleDark = useToggle(isDark)

const darkIcon = computed(() =>
  isDark.value ? 'i-tabler-sun' : 'i-tabler-moon',
)

const { y } = useScroll(document)
const isScrollingDown = ref(false)

watch(
  () => y.value,
  (newY, oldY) => {
    isScrollingDown.value = newY > oldY
  },
)
</script>

<template>
  <header
    :class="isScrollingDown ? 'scroll-up' : ''"
  >
    <h2 v-if="showHeader">
      {{ path }}
    </h2>

    <label>
      <span class="icon i-tabler-search" />
      <input type="search" placeholder="Search">
    </label>

    <span class="icon" :class="darkIcon" @click="toggleDark()" />
  </header>

  <main>
    <RouterView />
  </main>

  <Nav />
</template>

<style lang="scss" scoped>
@import '../styles/index';
</style>
