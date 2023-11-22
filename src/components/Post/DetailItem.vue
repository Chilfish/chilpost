<script setup lang="ts">
import type { Post, UserDisplay } from '~/types'

defineProps<{
  post: Post
  owner: UserDisplay
}>()
</script>

<template>
  <div class="user-box">
    <NuxtLink class="avatar" :to="`/@${owner.name}`">
      <CommonImg
        :src="owner.avatar"
      />
    </NuxtLink>

    <NuxtLink class="name-box" :to="`/@${owner.name}`">
      <span class="nickname">
        {{ owner.nickname }}
      </span>
      <span class="name">
        @{{ owner.name }}
      </span>
    </NuxtLink>

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
      {{ (new Date(post.created_at)).toLocaleString() }}
    </div>

    <PostAction
      :id="post.id"
      :u-name="owner.name"
      :status="post.status"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/post/detail';
</style>
