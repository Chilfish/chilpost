<script setup lang="ts">
import type { User } from '~/types'
import { useImg } from '~/utils'

const props = defineProps<{
  user: User
}>()

const avatar = useImg(props.user.avatar)
</script>

<template>
  <div class="profile">
    <div class="actions">
      <div class="avatar">
        <img :src="avatar">
      </div>

      <div class="buttons">
        <button> Follow </button>
      </div>
    </div>

    <div class="info">
      <h3 class="nick_name">
        {{ user.nick_name }}
      </h3>
      <h4 class="name">
        @{{ user.name }}
      </h4>
      <p class="bio">
        {{ user.bio }}
      </p>

      <div class="meta">
        <span>
          {{ user.status.follower_count }}
          <span class="followers"> followers </span>
        </span>
        <span>
          {{ user.status.following_count }}
          <span class="following"> following </span>
        </span>
        <span>
          {{ user.status.post_count }}
          <span class="posts"> posts </span>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/variables';

.profile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1rem;

  .avatar {
    width: 100px;
    height: 100px;
    margin-top: -50px;
    background-color: var(--text-2);
    border: 2px solid var(--background-color);
    border-radius: 50%;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}

.actions {
  display: flex;
  justify-content: center;
  padding-right: 1.5rem;
  margin: 1rem 0;

  .buttons {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-left: auto;
  }

  button {
    padding: 0.6rem 1.5rem;
    background: $theme-color;
    border-radius: 8px;
    transition: all 0.2s ease-in-out;

    &:hover {
      opacity: 0.8;
    }
  }
}

.info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;

  .nick_name {
    font-size: 1.5rem;
  }

  .name {
    margin-top: -0.8rem;
    color: var(--text-2);
  }

  .bio {
    font-size: 1rem;
  }

  .meta {
    display: flex;
    gap: 2rem;
    margin-top: 0.5rem;
    font-size: 0.9rem;

    .followers, .following, .posts {
      color: var(--text-2);
    }
  }
}
</style>
