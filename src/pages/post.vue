<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useAsyncState } from '@vueuse/core'
import { inject } from 'vue'
import type { PostService } from '~/services/postService'

const service = inject('postService') as PostService

const postId = useRoute().params.id as string
const { state: post, isLoading } = useAsyncState(service.getById(postId), null)
</script>

<template>
  <header>
    <button
      class="back"
      @click="$router.back()"
    >
      <span class="box">
        <span class="icon i-tabler-arrow-left" />
      </span>
    </button>
    <h3>Post Detail</h3>
  </header>

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

  <Nav />
</template>

<style lang="scss" scoped>
@import "../styles/variables";

header {
  display: flex;
  gap: 1rem;
  align-items: center;
  width: 100%;
  height: $header-height;
  padding: 0.5rem 1rem;
}

main {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0.5rem 1.2rem;
}

@media (min-width: $smd) {
  header,
  main {
    width: stretch;
    margin-left: $aside-width;
  }
}
</style>
