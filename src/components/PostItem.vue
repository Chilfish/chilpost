<script setup lang="ts">
import dayjs from 'dayjs'
import type { Post } from '~/types'

const props = defineProps<{
  post: Post
}>()
const post = props.post

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
    <img class="avatar" :src="post.owner.avatar" alt="avatar">
    <div>
      <div class="post-meta">
        <div>
          <span class="nick-name">
            {{ post.owner.nick_name }}
          </span>
          <span class="name">
            @{{ post.owner.name }}
          </span>
          <span>·</span>
          <span
            class="date"
            :title="dayjs(post.createdAt).format()"
          >
            {{ formatTime() }}
          </span>
        </div>
        <span class="icon menu i-carbon-overflow-menu-horizontal" />
      </div>

      <main>
        <p>{{ post.content }}</p>
      </main>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '../styles/post-item';
</style>
