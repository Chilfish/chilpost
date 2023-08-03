<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useAsyncState } from '@vueuse/core'
import { usePostStore } from '~/store/postStore'

const postId = useRoute().params.postId as string

const postStore = usePostStore()
const { state: post, isLoading } = useAsyncState(
  postStore.fetchById(postId),
  null,
)
</script>

<template>
  <Header>
    <h3>Post Details</h3>
  </Header>

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
@import "../styles/variables";

main {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0.5rem 1rem;
  margin: auto;
  margin-top: $header-height;
}
</style>
