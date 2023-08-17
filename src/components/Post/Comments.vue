<script setup lang="ts">
import type { NuxtError } from '#app'
import type { PostDetail, pid } from '~/types'

const props = defineProps<{
  commentIds: pid[]
}>()

const {
  state,
  isLoading,
  error,
} = useAsyncState(
  useMyFetch<PostDetail[]>('/post/comments', 'post', { commentIds: props.commentIds }),
  null,
)
const err = computed(() => (error.value as NuxtError)?.toJSON())
</script>

<template>
  <CommonLoading :error="err" :is-loading="isLoading" />

  <section v-if="state?.data && !isLoading">
    <PostItem
      v-for="comment in state?.data"
      :key="comment.post.id"
      :post="comment.post"
      :owner="comment.owner"
    />
  </section>
</template>

<style lang="scss" scoped>
section {
  padding: 1.5rem 1rem;
}
</style>
