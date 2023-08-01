<script setup lang="ts">
import dayjs from 'dayjs'
import type { Post } from '~/types'
import { useImg } from '~/utils'

const props = defineProps<{
  post: Post
}>()
const post = props.post

const avatarUrl = useImg(post.owner.avatar)

function formatTime() {
  const now = Date.now()
  const time = dayjs(now).diff(post.createdAt, 'minute')

  const isSameYear = dayjs(now).isSame(post.createdAt, 'year')

  if (time < 1)
    return 'just now'
  if (time < 60)
    return `${time}m`
  if (time < 60 * 24)
    return `${Math.floor(time / 60)}h`
  if (time < 60 * 24 * 365 && isSameYear)
    return dayjs(post.createdAt).format('MM-DD')
  return dayjs(post.createdAt).format('YY-MM-DD')
}
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
          <div>
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
              {{ formatTime() }}
            </RouterLink>
          </div>
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
