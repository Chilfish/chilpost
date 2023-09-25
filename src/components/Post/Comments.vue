<script setup lang="ts">
import type { PostDetail } from '~/types'

defineProps<{
  comments: PostDetail[]
}>()
</script>

<template>
  <section>
    <PostItem
      v-for="comment in comments"
      :key="comment.id"
      :post="comment"
      :owner="comment.owner"
    />
  </section>
</template>

<style lang="scss" scoped>
section {
  padding: 1.5rem 1rem;
}
</style>
