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
main {
  padding: 1rem;
  display: flex;
  flex-direction: column;
}
</style>
