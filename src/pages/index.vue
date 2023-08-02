<script setup lang="ts">
import { useAsyncState, useDark, useScroll, useToggle } from '@vueuse/core'
import { computed, inject, ref, watch } from 'vue'
import type { PostService } from '~/services/postService'

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

const service = inject('postService') as PostService

const { state: posts, isLoading, isReady } = useAsyncState(service.getPosts(), null)
</script>

<template>
  <header :class="isScrollingDown ? 'scroll-up' : ''">
    <h2>Explore</h2>

    <label>
      <span class="icon i-tabler-search" />
      <input type="search" placeholder="Search">
    </label>

    <span class="icon" :class="darkIcon" @click="toggleDark()" />
  </header>

  <main>
    <div v-if="isLoading" class="loading-box">
      <span class="icon loading" />
    </div>
    <template v-else-if="isReady">
      <PostItem
        v-for="post in posts"
        :key="post.id"
        :post="post"
      />
    </template>
  </main>
</template>

<style lang="scss" scoped>
@import '../styles/index';
</style>
