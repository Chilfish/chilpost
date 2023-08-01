<script setup lang="ts">
import dayjs from 'dayjs'
import type { Post } from '~/types'
import { timeDiff, useImg } from '~/utils'

const props = defineProps<{
  post: Post
}>()
const post = props.post

const avatarUrl = useImg(post.owner.avatar)
</script>

<template>
  <section>
    <RouterLink :to="`${post.owner.name}/${post.id}`">
      <RouterLink
        class="avatar"
        :to="`/@${post.owner.name}`"
      >
        <img :src="avatarUrl" alt="avatar">
      </RouterLink>
      <div class="section-main">
        <div class="post-meta">
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
          <span>·</span>
          <RouterLink
            class="date"
            :title="dayjs(post.createdAt).format()"
            :to="`/${post.owner.name}/${post.id}`"
          >
            {{ timeDiff(post.createdAt) }}
          </RouterLink>

          <span class="icon menu i-carbon-overflow-menu-horizontal" />
        </div>

        <main>
          <p>{{ post.content }}</p>
        </main>
      </div>
    </RouterLink>
  </section>
</template>

<style lang="scss">
@import '../styles/post-item';
</style>
