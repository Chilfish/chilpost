<script setup lang="ts">
import { useUserStore } from '~/stores/userStore'
import type { User } from '~/types'

const props = defineProps<{
  user: User
}>()
const userStore = useUserStore()
const avatar = useImg(props.user.avatar)

const isHovered = ref(false)
const isFollowing = ref(props.user.status.is_following)

const isMe = computed(() => props.user.id === userStore.curUser.id)

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

const { state, isLoading, execute } = useAsyncState(
  async () => userStore.follow(props.user.id),
  false,
  { immediate: false },
)

watch(state, () => {
  if (state.value === true)
    isFollowing.value = !isFollowing.value
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
          v-element-hover="(e) => isHovered = e "
          :class="isFollowing && isHovered ? 'unfollow' : ''"
          :disabled="isLoading"
          @click="() =>
            isMe ? $router.push('/settings') : execute()"
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
@use '~/assets/profile/card';
</style>
