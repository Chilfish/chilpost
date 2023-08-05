<script setup lang="ts">
const postStore = usePostStore()
const route = useRoute()
const username = ref(route.params.name as string)

const isLoading = ref(true)
const data = computedAsync(
  async () => await postStore.fetchByOwnerName(username.value),
  null,
)

watchEffect(() => {
  username.value = route.params.name as string

  if (data.value) {
    isLoading.value = false
    const owner = data.value.owner
    const title = `${owner.nick_name}(@${owner.name})`
    useHead({
      title,
    })
  }
})
</script>

<template>
  <CommonHeader>
    <h3> {{ data?.owner.nick_name }}</h3>
  </CommonHeader>

  <div class="banner" />

  <div
    v-if="isLoading"
    class="loading-box"
  >
    <span class="icon loading" />
  </div>

  <template v-else>
    <div
      v-if="!data"
      class="no-data"
    >
      User Not Found @{{ username }}
    </div>

    <template v-else>
      <ProfileCard :user="data.owner" />
      <main class="post-list">
        <PostItem
          v-for="post in data.posts"
          :key="post.id"
          :post="post"
          :owner="data?.owner"
        />

        <div
          v-if="!data.posts.length"
          class="no-data"
        >
          No posts yet
        </div>
      </main>
    </template>
  </template>
</template>

<style lang="scss" scoped>
@use '~/assets/profile/index';
</style>
