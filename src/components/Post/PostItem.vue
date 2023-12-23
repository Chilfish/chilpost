<script setup lang="ts">
import type { PostDetail, UserDisplay } from '~/types'

const {
  post,
} = defineProps<{
  post: PostDetail
}>()

const owner = computed(() => post.owner)
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
          {{ timeDiff(post.created_at) }}
        </NuxtLink>

        <button
          class="menu"
          @click.stop="showMenu"
        >
          <span class="box">
            <span class="i-tabler-dots icon" />
          </span>
        </button>
      </div>

      <div
        v-if="post.reply_to"
        class="reply-to"
      >
        <span>Replying to</span>
        <NuxtLink
          :to="`/@${post.reply_to.username}`"
          @click.stop
        >
          @{{ post.reply_to.username }}
        </NuxtLink>
      </div>

      <div class="content">
        <p>
          <span>{{ post.content }}</span>
          <span
            v-if="post.is_long"
            class="load-more"
          >
            Load more
          </span>
        </p>
      </div>

      <PostAction
        :id="post.id"
        :status="post.status"
        :u-name="owner.name"
        :parent-id="post.parent_id"
        @click.stop
      />
    </div>
  </div>
</template>

<style lang="scss">
@use '~/assets/post/item';
</style>
