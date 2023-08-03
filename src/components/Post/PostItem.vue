<script setup lang="ts">
import dayjs from 'dayjs'
import { timeDiff } from '~/utils'
import type { Post } from '~/types'
import { useUserStore } from '~/store/userStore'

const props = defineProps<{
  post: Post
}>()

const useUsers = useUserStore()
const owner = useUsers.getById(props.post.owner)
</script>

<template>
  <section>
    <RouterLink :to="`@${owner?.name}/${post.id}`">
      <RouterLink
        class="avatar"
        :to="`/@${owner?.name}`"
      >
        <img :src="owner?.avatar" alt="avatar">
      </RouterLink>
      <div class="section-main">
        <div class="post-meta">
          <RouterLink
            class="name-box"
            :to="`/@${owner?.name}`"
          >
            <span class="nick-name">
              {{ owner?.nick_name }}
            </span>
            <span class="name">
              @{{ owner?.name }}
            </span>
          </RouterLink>
          <span>·</span>
          <RouterLink
            class="date"
            :title="dayjs(post.createdAt).format()"
            :to="`/@${owner?.name}/${post.id}`"
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
    </RouterLink>
  </section>
</template>

<style lang="scss">
@import '~/styles/post-item';
</style>
