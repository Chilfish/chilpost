<script setup lang="ts">
import { computed, ref } from 'vue'
import { vElementHover } from '@vueuse/components'
import { useUserStore } from '~/store/userStore'
import type { User } from '~/types'
import { useImg } from '~/utils'

const props = defineProps<{
  user: User
}>()
const userStore = useUserStore()
const avatar = useImg(props.user.avatar)

const isHovered = ref(false)

const following = computed(() => props.user.status.is_following)

const foBtnText = computed(() => {
  if (props.user.id === userStore.curUser.id)
    return 'Edit Profile'

  if (following.value) {
    if (isHovered.value)
      return 'Unfollow'

    return 'Following'
  }

  return 'Follow'
})
</script>

<template>
  <div class="profile">
    <div class="actions">
      <div class="avatar">
        <img :src="avatar">
      </div>

      <div class="buttons">
        <button
          v-element-hover="(e) => { isHovered = e }"
          :class="following && isHovered ? 'unfollow' : ''"
        >
          {{ foBtnText }}
        </button>
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
@import '~/styles/profile/profile-card';
</style>
