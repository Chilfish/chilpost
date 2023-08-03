<script setup lang="ts">
import { useScroll } from '@vueuse/core'
import { inject, ref, watch } from 'vue'
import type { DarkStore } from '~/store/darkStore'
import { usePostStore } from '~/store/postStore'

const { y } = useScroll(document)
const isScrollingDown = ref(false)
watch(
  () => y.value,
  (newY, oldY) => {
    isScrollingDown.value = newY > oldY
  },
)

const dark = inject('darkStore') as DarkStore
const postStore = usePostStore()

const posts = postStore.posts
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
    <PostItem
      v-for="post in posts"
      :key="post.id"
      :post="post"
      :owner="post.owner"
    />
  </main>
</template>

<style lang="scss" scoped>
@import '../styles/index';
</style>
