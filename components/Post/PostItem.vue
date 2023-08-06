<script setup lang="ts">
import type { Post } from 'types/post'
import type { User } from 'types/user'

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
        <RouterLink
          :to="`/@${owner.name}`"
          @click.stop
        >
          <CommonImg
            :src="avatar"
            alt="avatar"
          />
        </RouterLink>
      </div>

      <div class="section-main">
        <div class="post-meta">
          <RouterLink
            class="name-box"
            :to="`/@${owner.name}`"
            @click.stop
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
            :to="`/@${owner.name}/${post.id}`"
            @click.stop
          >
            {{ timeDiff(post.createdAt) }}
          </RouterLink>

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
  </section>
</template>

<style lang="scss">
@use '~/assets/post/item';
</style>
