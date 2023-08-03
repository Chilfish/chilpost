<script setup lang="ts">
import type { PostDetail } from '~/types'

defineProps<{
  post: PostDetail
}>()
</script>

<template>
  <div class="user-box">
    <RouterLink class="avatar" :to="`/@${post.owner.name}`">
      <img :src="post.owner.avatar" alt="avatar">
    </RouterLink>

    <RouterLink class="name-box" :to="`/@${post.owner.name}`">
      <span class="nick-name">
        {{ post.owner.nick_name }}
      </span>
      <span class="name">
        @{{ post.owner.name }}
      </span>
    </RouterLink>

    <button class="menu">
      <span class="box">
        <span class="icon i-tabler-dots" />
      </span>
    </button>
  </div>

  <div class="content">
    <p>{{ post.content }}</p>
  </div>

  <div class="post-meta">
    <div class="time">
      {{ (new Date(post.createdAt)).toLocaleString() }}
    </div>

    <PostAction :id="post.id" :status="post.status" />
  </div>
</template>

<style lang="scss" scoped>
@import '~/styles/post-detail';
</style>
