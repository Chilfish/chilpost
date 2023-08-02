<script setup lang="ts">
import { computed, inject } from 'vue'
import { fmtNum } from '~/utils'
import type { PostStatus } from '~/types'
import type { PostService } from '~/services/postService'

const props = defineProps<{
  status: PostStatus
  id: string
}>()

const service = inject('postService') as PostService

const { status, id } = props

const likeStyle = computed(() =>
  status.is_liked
    ? { icon: 'is_like i-tabler-heart-filled', class: 'is_like' }
    : { icon: 'i-tabler-heart', class: '' },
)
</script>

<template>
  <div class="post-action">
    <button
      class="chat"
      :title="`${status.comment_count}`"
    >
      <span class="box">
        <span class="icon i-tabler-message-circle" />
      </span>
      <span class="count">{{ fmtNum(status.comment_count) }}</span>
    </button>

    <button
      class="repost"
      :title="`${status.repost_count}`"
    >
      <span class="box">
        <span class="icon i-tabler-repeat" />
      </span>
      <span class="count">{{ fmtNum(status.repost_count) }}</span>
    </button>

    <button
      :class="`like ${likeStyle.class}`"
      :title="`${status.like_count}`"
      @click="service.toggleLike(id)"
    >
      <span class="box">
        <span :class="`icon ${likeStyle.icon}`" />
      </span>
      <span class="count">{{ fmtNum(status.like_count) }}</span>
    </button>

    <button class="share">
      <span class="box">
        <span class="icon i-tabler-share" />
      </span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:map";
@import "~/styles/variables";

.post-action {
  display: flex;
  justify-content: space-between;
  color: #666;

  .count {
    margin-left: 5px;
  }
}

button.is_like {
  color: map.get($color-map, '.like')
}

@media (min-width: $smd) {
  .post-action {
    padding-right: 25rem;
  }
}
</style>
