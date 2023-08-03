<script setup lang="ts">
import { useAsyncState, useScroll } from '@vueuse/core'
import { inject, ref, watch } from 'vue'
import type { PostService } from '~/services/postService'
import type { DarkStore } from '~/store/darkStore'

const { y } = useScroll(document)
const isScrollingDown = ref(false)
watch(
  () => y.value,
  (newY, oldY) => {
    isScrollingDown.value = newY > oldY
  },
)

const dark = inject('darkStore') as DarkStore
const service = inject('postService') as PostService

const { state: posts, isLoading, isReady } = useAsyncState(service.getPosts(), null)
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

    <span class="icon" :class="dark.icon.value" @click="dark.toggle()" />
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
~/store/darkStore
