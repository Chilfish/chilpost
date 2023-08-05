<script setup lang="ts">
import { usePostStore } from '~/stores/postStore'

const postId = useRoute().params.postId as string

const postStore = usePostStore()
const {
  state: post,
  isLoading,
} = useAsyncState(
  postStore.fetchById(postId),
  null,
)

watch(post, () => {
  const title = `${post.value?.owner.nick_name}'s Post: ${post.value?.content.substring(0, 50)}`
  // useTitle(title)
})
</script>

<template>
  <Header>
    <h3>Post Details</h3>
  </Header>

  <main>
    <div v-if="isLoading" class="loading-box">
      <span class="icon loading" />
    </div>

    <template v-else>
      <div v-if="!post">
        Not Found {{ postId }}
      </div>
      <PostDetail
        v-else
        :post="post"
        :owner="post.owner"
      />
    </template>
  </main>
</template>

<style lang="scss" scoped>
@use "~/assets/variables";

main {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0.5rem 1rem;
  margin: auto;
}
</style>
