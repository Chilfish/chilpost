<script setup lang="ts">
import type { PostDetail } from '~/types'

const modalStore = useModalStore()
const postStore = usePostStore()

const isLoading = ref(false)

const {
  data,
  execute: submit,
} = useMyFetch<{ post: PostDetail }>('/post/new', {
  method: 'post',
  body: postStore.newPostBody,
  manual: true,
})

watch(data, () => {
  const post = data.value?.data?.post
  if (post) {
    isLoading.value = false
    if (post.is_body)
      postStore.addPost(post)
    modalStore.close()
  }
})
</script>

<template>
  <div id="send-post">
    <div>
      <span
        class="i-tabler-x icon"
        @click="modalStore.open()"
      />
    </div>
    <form>
      <textarea
        v-model="postStore.newPostBody.content"
        placeholder="Wassup?!"
      />
      <CommonButton
        text="submit"
        class="btn-primary"
        :is-loading="isLoading"
        :disabled="!postStore.newPostBody.content"
        @click="isLoading = true, submit()"
      />
    </form>
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/variables" as *;

div#send-post {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20rem;
  max-height: 70vh;

  div {
    width: 100%;
  }

  .icon {
    color: var(--text-color);
    cursor: pointer;
  }
}

form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  button {
    margin-left: auto;
  }
}
</style>
