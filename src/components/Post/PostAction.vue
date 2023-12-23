<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import Toast from '@cpa/Toast'
import type { PostStatus } from '~/types'

const props = defineProps<{
  status: PostStatus
  id: string
  uName: string
  parentId?: string
}>()

const modalStore = useModalStore()
const userStore = useUserStore()
const postStore = usePostStore()

const status = ref(props.status)
const isLiked = ref(props.status.is_liked)

const likeStyle = computed(() =>
  isLiked.value
    ? { icon: 'is_like i-tabler-heart-filled', class: 'is_like' }
    : { icon: 'i-tabler-heart', class: '' },
)
const { copy, copied } = useClipboard()

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

function copyLink() {
  const [p, _, host] = window.location.href.split('/')
  const url = `${p}//${host}/@${props.uName}/${props.id}`

  copy(url).then(() => {
    if (copied)
      Toast({ type: 'success', message: 'copied' })
  })
}

function repost() {
  Toast({ type: 'warning', message: 'Not yet implemented 😹' })
}

function deletePost() {
  if (confirm(`confirm to delete this post?`))
    postDelete(props.id, props.parentId)
}

watchEffect(() => {
  if (likes.value?.data) {
    status.value.like_count = likes.value.data.count
    isLiked.value = !isLiked.value
  }
})
</script>

<template>
  <div class="post-action">
    <button
      class="chat"
      :title="`${status.comment_count} comments`"
      @click="sendComment"
    >
      <span class="box">
        <span class="i-tabler-message-circle icon" />
      </span>
      <span class="count">{{ fmtNum(status.comment_count) }}</span>
    </button>

    <button
      class="repost"
      :title="`${status.repost_count} reposts`"
      @click="repost"
    >
      <span class="box">
        <span class="i-tabler-repeat icon" />
      </span>
      <span class="count">{{ fmtNum(status.repost_count) }}</span>
    </button>

    <button
      :class="`like ${likeStyle.class}`"
      :title="`${status.like_count} likes`"
      @click="toggleLike()"
    >
      <span class="box">
        <span :class="`icon ${likeStyle.icon}`" />
      </span>
      <span class="count">{{ fmtNum(status.like_count) }}</span>
    </button>

    <button
      class="share"
      title="Share this post"
      @click="copyLink"
    >
      <span class="box">
        <span class="i-tabler-share icon" />
      </span>
    </button>

    <button
      v-if="userStore.curUser?.name === uName"
      class="delete"
      title="Delete this post"
      @click="deletePost"
    >
      <span class="box">
        <span class="i-tabler-trash icon" />
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
  margin-left: -2rem;
  color: #666;
  user-select: none;

  .count {
    margin-left: 5px;
  }
}

button {
  min-width: 5rem;
  text-align: center;

  --uno: center;

  &.is_like {
    color: map.get($color-map, '.like')
  }
}

@media (min-width: $sm) {
  .post-action {
    margin-left: -3rem;
  }

  button {
    min-width: 8rem;
  }
}
</style>
