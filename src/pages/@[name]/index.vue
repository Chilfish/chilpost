<script setup lang="ts">
const postStore = usePostStore()
const route = useRoute()
const username = ref(route.params.name as string)

const isLoading = ref(true)
const state = computedAsync(
  async () => await postStore.fetchByOwnerName(username.value),
  null,
)

watchEffect(() => {
  username.value = route.params.name as string

  if (state.value) {
    isLoading.value = false
    const owner = state.value.data?.owner
    const title = `${owner?.nick_name}(@${owner?.name})`
    useHead({
      title,
    })
  }
})
</script>

<template>
  <CommonHeader>
    <h3> {{ state?.data?.owner.nick_name }}</h3>
  </CommonHeader>

  <div class="banner" />

  <CommonLoading :is-loading="isLoading">
    <div
      v-if="!state?.result"
      class="no-data"
    >
      User Not Found @{{ username }}
    </div>

    <template v-else-if="state.data">
      <ProfileCard :user="state.data.owner" />
      <main class="post-list">
        <PostItem
          v-for="post in state.data.posts"
          :key="post.id"
          :post="post"
          :owner="state.data?.owner"
        />

        <div
          v-if="!state.data.posts.length"
          class="no-data"
        >
          No posts yet
        </div>
      </main>
    </template>
  </CommonLoading>
</template>

<style lang="scss" scoped>
@use '~/assets/profile/index';
</style>
