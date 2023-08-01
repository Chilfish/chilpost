<script setup lang="ts">
import { useAsyncState } from '@vueuse/core'
import { inject } from 'vue'
import type { TPostService } from '~/services/post'

const service = inject('postService') as TPostService

const { state, isLoading, isReady } = useAsyncState(service.getPosts(), null)
</script>

<template>
  <span v-if="isLoading" class="icon loading" />
  <template v-else-if="isReady">
    <PostItem v-for="post in state" :key="post.id" :post="post" />
  </template>
</template>

<style lang="scss" scoped>
span.loading {
  margin-top: 1rem;
}
</style>
