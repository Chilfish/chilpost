<script setup lang="ts">
import type { Post } from '~/types'
import { useImg } from '~/utils'

const props = defineProps<{
  post: Post
}>()

const post = props.post

const avatarUrl = useImg(props.post.owner.avatar)
</script>

<template>
  <div class="user-box">
    <RouterLink
      class="avatar"
      :to="`/@${post.owner.name}`"
    >
      <img :src="avatarUrl" alt="avatar">
    </RouterLink>

    <RouterLink
      class="name-box"
      :to="`/@${post.owner.name}`"
    >
      <span class="nick-name">
        {{ post.owner.nick_name }}
      </span>
      <span class="name">
        @{{ post.owner.name }}
      </span>
    </RouterLink>

    <span class="icon menu i-carbon-overflow-menu-horizontal" />
  </div>

  <div class="content">
    <p>{{ post.content }}</p>
  </div>

  <div class="post-meta">
    <div class="time">
      {{ (new Date(post.createdAt)).toLocaleString() }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/post-detail';
</style>
