<script setup lang="ts">
import type { PostStatus } from '~/types'

const props = defineProps<{
  status: PostStatus
  id: number
}>()

const modalStore = useModalStore()
const postStore = usePostStore()
const curUser = useUserStore().curUser
const isLike = computed(() => curUser && props.status.likes.includes(curUser.id.toString()))

const status = ref(props.status)
const likeStyle = computed(() =>
  isLike.value
    ? { icon: 'is_like i-tabler-heart-filled', class: 'is_like' }
    : { icon: 'i-tabler-heart', class: '' },
)

const {
  data: likes,
  execute: toggleLike,
} = useMyFetch<{ count: number }>('/post/like', {
  method: 'POST',
  body: {
    id: props.id,
  },
  manual: true,
})

function sendComment() {
  postStore.newPostBody = {
    content: '',
    meta: {
      type: 'comment',
      pcId: props.id,
    },
  }

  modalStore.open()
}

watchEffect(() => {
  if (likes.value?.data)
    status.value.like_count += likes.value.data.count === 1 ? 1 : -1
})
</script>

<template>
  <div class="post-action">
    <button
      class="chat"
      :title="`${status.comment_count}`"
      @click="sendComment"
    >
      <span class="box">
        <span class="icon i-tabler-message-circle" />
      </span>
      <span class="count">{{ fmtNum(status.comment_count) }}</span>
    </button>

    <button
      class="repost"
      :title="`${status.repost_count}`"
    >
      <span class="box">
        <span class="icon i-tabler-repeat" />
      </span>
      <span class="count">{{ fmtNum(status.repost_count) }}</span>
    </button>

    <button
      :class="`like ${likeStyle.class}`"
      :title="`${status.like_count}`"
      @click="toggleLike()"
    >
      <span class="box">
        <span :class="`icon ${likeStyle.icon}`" />
      </span>
      <span class="count">{{ fmtNum(status.like_count) }}</span>
    </button>

    <button class="share">
      <span class="box">
        <span class="icon i-tabler-share" />
      </span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:map";
@use "~/assets/variables" as *;

.post-action {
  display: flex;
  justify-content: flex-start;
  color: #666;
  user-select: none;

  .count {
    margin-left: 5px;
  }
}

button {
  min-width: 6rem;

  &.is_like {
    color: map.get($color-map, '.like')
  }
}

@media (min-width: $sm) {
  button {
    min-width: 8rem;
  }
}
</style>
