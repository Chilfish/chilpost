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
  isDark.value ? 'i-carbon-sun' : 'i-carbon-moon',
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

  <nav>
    <div>
      <img class="logo" src="/favicon.ico">
      <h1>Chill Post</h1>
    </div>
    <router-link to="/">
      <span class="icon i-tabler-home-2" />
      <p>Explore</p>
    </router-link>

    <router-link to="/@Chilfish">
      <span class="icon i-tabler-user" />
      <p>Profile</p>
    </router-link>
  </nav>
</template>

<style lang="scss" scoped>
@import '../styles/index'
</style>
