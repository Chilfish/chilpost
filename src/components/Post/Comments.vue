<script setup lang="ts">
import type { PostDetail, pid } from '~/types'

const props = defineProps<{
  commentIds: pid[]
}>()

const {
  data,
  pending,
  error,
} = useMyFetch<PostDetail[]>('/post/comments', {
  query: { commentIds: props.commentIds },
})
</script>

<template>
  <CommonLoading :error="error?.data" :is-loading="pending" />

  <section v-if="data?.data">
    <PostItem
      v-for="comment in data.data"
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
