<script setup lang="ts">
import { appName } from '~/constants'
import type { User } from '~/types'

const { homeProfile } = storeToRefs(useUserStore())
const route = useRoute()

const name = computed(() => {
  const { name } = route.params as { name: string }

  homeProfile.value.name = name
  useHead({
    title: `${appName} | ${name}`,
  })
  return name
})

const { data } = useMyFetch<User>(`/user/profile/${name.value}`)
const userData = computed(() => data.value?.data)
</script>

<template>
  <CommonHeader>
    <h3> {{ userData?.nickname }}</h3>
  </CommonHeader>

  <div class="banner" />

  <main>
    <ProfileCard
      v-if="userData"
      :user="userData"
    />

    <PostInfinite
      :user="userData"
      post-type="profile"
    />
  </main>
</template>

<style lang="scss" scoped>
@use '~/assets/profile/index';
</style>
