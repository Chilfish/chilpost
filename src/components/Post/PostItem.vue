<script setup lang="ts">
import type { Post, UserDisplay } from '~/types'

defineProps<{
  post: Post
  owner: UserDisplay
}>()
</script>

<template>
  <div
    class="main"
    @click="$router.push(`/@${owner.name}/${post.id}`)"
  >
    <div class="avatar">
      <NuxtLink
        :to="`/@${owner.name}`"
        @click.stop
      >
        <CommonImg
          :src="owner.avatar"
          alt="avatar"
        />
      </NuxtLink>
    </div>

    <div class="section-main">
      <div class="post-meta">
        <NuxtLink
          class="name-box"
          :to="`/@${owner.name}`"
          @click.stop
        >
          <span class="nickname">
            {{ owner.nickname }}
          </span>
          <span class="name">
            @{{ owner.name }}
          </span>
        </NuxtLink>
        <span>·</span>

        <NuxtLink
          class="date"
          :to="`/@${owner.name}/${post.id}`"
          @click.stop
        >
          {{ timeDiff(post.createdAt) }}
        </NuxtLink>

        <button
          class="menu"
          @click.stop
        >
          <span class="box">
            <span class="icon i-tabler-dots" />
          </span>
        </button>
      </div>

      <div class="content">
        <p>{{ post.content }}</p>
      </div>

      <PostAction
        :id="post.id"
        :status="post.status"
        @click.stop
      />
    </div>
  </div>
</template>

<style lang="scss">
@use '~/assets/post/item';
</style>
