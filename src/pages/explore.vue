<script setup lang="ts">
import { useAsyncState } from '@vueuse/core'
import { inject } from 'vue'
import type { TPostService } from '~/services/post'

const service = inject('postService') as TPostService

const { state: posts, isLoading, isReady } = useAsyncState(service.getPosts(), null)
</script>

<template>
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
</template>

<style lang="scss" scoped>
</style>
