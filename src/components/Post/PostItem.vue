<script setup lang="ts">
import dayjs from 'dayjs'
import { timeDiff, useImg } from '~/utils'
import type { Post, User } from '~/types'

const props = defineProps<{
  post: Post
  owner: User
}>()

const avatar = useImg(props.owner.avatar)
</script>

<template>
  <section>
    <div
      @click="$router.push(`/@${owner.name}/${post.id}`)"
    >
      <div class="avatar">
        <RouterLink :to="`/@${owner.name}`">
          <img :src="avatar" alt="avatar">
        </RouterLink>
      </div>

      <div class="section-main">
        <div class="post-meta">
          <RouterLink
            class="name-box"
            :to="`/@${owner.name}`"
          >
            <span class="nick-name">
              {{ owner.nick_name }}
            </span>
            <span class="name">
              @{{ owner.name }}
            </span>
          </RouterLink>
          <span>·</span>

          <RouterLink
            class="date"
            :title="dayjs(post.createdAt).format()"
            :to="`/@${owner.name}/${post.id}`"
          >
            {{ timeDiff(post.createdAt) }}
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

        <PostAction :id="post.id" :status="post.status" />
      </div>
    </div>
  </section>
</template>

<style lang="scss">
@import '~/styles/post-item';
</style>
