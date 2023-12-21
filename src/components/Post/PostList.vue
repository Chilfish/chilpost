<script setup lang="ts">
import type { PostDetail } from '~/types'

defineProps<{
  posts: PostDetail[]
}>()
</script>

<template>
  <main>
    <h3
      v-if="posts.length === 0"
      class="error"
    >
      No Post Yet
    </h3>

    <TransitionGroup
      id="post-list"
      tag="ul"
      name="fade"
    >
      <section
        v-for="item in posts"
        :key="item.id"
      >
        <PostItem
          :post="item"
          :owner="item.owner"
        />
      </section>
    </TransitionGroup>
  </main>
</template>

<style lang="scss" scoped>
@use "~/assets/post/list";
</style>
