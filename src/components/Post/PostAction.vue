<script setup lang="ts">
import { computed } from 'vue'
import { fmtNum } from '~/utils'
import type { PostStatus } from '~/types'
import { usePostStore } from '~/store/postStore'

const props = defineProps<{
  status: PostStatus
  id: string
}>()

const postStore = usePostStore()

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
      @click="postStore.toggleLike(id)"
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
  justify-content: flex-start;
  color: #666;

  .count {
    margin-left: 5px;
  }
}

button {
  min-width: 6rem;

  &.is_like {
    color: map.get($color-map, '.like')
  }
}

@media (min-width: $sm) {
  button {
    min-width: 8rem;
  }
}
</style>
