<script setup lang="ts">
import { vElementHover } from '@vueuse/components'
import { storeToRefs } from 'pinia'
import type { User } from '~/types'

const props = defineProps<{
  user: User
}>()
const { curUser } = storeToRefs(useUserStore())

const isHovered = ref(false)
const isFollowing = ref(false)
const isMe = ref(false)
const isLoading = ref(false)

const foBtnText = computed(() => {
  if (isMe.value)
    return 'Edit Profile'

  if (isFollowing.value) {
    if (isHovered.value)
      return 'Unfollow'

    return 'Following'
  }

  return 'Follow'
})

const {
  data,
  execute,
} = useMyFetch<boolean>('/user/follow', {
  method: 'POST',
  body: {
    id: props.user.id,
  },
  manual: true,
})

watchEffect(() => {
  if (curUser.value?.name) {
    isFollowing.value = curUser.value.status.followings.includes(props.user.id.toString())
    isMe.value = curUser.value.id === props.user.id
  }

  if (data.value?.data) {
    isLoading.value = false
    isFollowing.value = !isFollowing.value
    curUser.value && toggleFollow(curUser.value, props.user)
  }
})
</script>

<template>
  <div class="profile">
    <div class="actions">
      <div class="avatar">
        <commonImg
          :src="user.avatar"
        />
      </div>

      <div class="buttons">
        <button
          v-element-hover="(e: boolean) => isHovered = e "
          :class="isFollowing && isHovered ? 'unfollow' : ''"
          :disabled="isLoading"
          @click="() =>
            isMe ? $router.push('/settings') : (execute(), isLoading = true)"
        >
          <span
            :style="{ display: isLoading ? 'inline' : 'none' }"
            class="loading icon"
          />
          <span> {{ foBtnText }}</span>
        </button>
      </div>
    </div>

    <div class="info">
      <h3 class="nickname">
        {{ user.nickname }}
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
          <span class="followings"> followings </span>
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
@use '~/assets/profile/card';
</style>