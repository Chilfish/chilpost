<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useAsyncState } from '@vueuse/core'
import { inject } from 'vue'
import type { TPostService } from '~/services/post'

const service = inject('postService') as TPostService

const postId = useRoute().params.id as string
const { state: post, isLoading } = useAsyncState(service.getById(postId), null)
</script>

<template>
  <nav>
    <RouterLink to="/">
      <span class="icon i-carbon-arrow-left" />
    </RouterLink>
    <h3>Post Detail</h3>
  </nav>
  <main>
    <div v-if="isLoading" class="loading-box">
      <span class="icon loading" />
    </div>

    <template v-else>
      <div v-if="!post">
        Not Found {{ postId }}
      </div>
      <PostDetail v-else :post="post" />
    </template>
  </main>
</template>

<style lang="scss" scoped>
nav {
  height: 3rem;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1rem;

  a {
    height: 100%;
    width: 2rem;
    padding: 0.5rem;
  }
}

main {
  width: 100%;
  height: 100%;
  padding:0.5rem 1.2rem;
  display: flex;
  flex-direction: column;
}
</style>
