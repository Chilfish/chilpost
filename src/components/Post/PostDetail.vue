<script setup lang="ts">
import { computedAsync } from '@vueuse/core'
import { inject } from 'vue'
import type { UserService } from '~/services/userService'
import type { Post } from '~/types'

const props = defineProps<{
  post: Post
}>()

const post = props.post

const userService = inject('userService') as UserService

const owner = computedAsync(async () => await userService.getById(post.owner))
</script>

<template>
  <div class="user-box">
    <RouterLink class="avatar" :to="`/@${owner?.name}`">
      <img :src="owner?.avatar" alt="avatar">
    </RouterLink>

    <RouterLink class="name-box" :to="`/@${owner?.name}`">
      <span class="nick-name">
        {{ owner?.nick_name }}
      </span>
      <span class="name">
        @{{ owner?.name }}
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
