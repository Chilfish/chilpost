<script setup lang="ts">
import type { Post, User } from '~/types'
import { useImg } from '~/utils'

const props = defineProps<{
  post: Post
  owner: User
}>()

const avatar = useImg(props.owner.avatar)
</script>

<template>
  <div class="user-box">
    <RouterLink class="avatar" :to="`/@${owner.name}`">
      <img :src="avatar" alt="avatar">
    </RouterLink>

    <RouterLink class="name-box" :to="`/@${owner.name}`">
      <span class="nick-name">
        {{ owner.nick_name }}
      </span>
      <span class="name">
        @{{ owner.name }}
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
