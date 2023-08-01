<script setup lang="ts">
import type { Post } from '~/types'
import { useImg } from '~/utils'

const props = defineProps<{
  post: Post
}>()

const post = props.post

const avatarUrl = useImg(props.post.owner.avatar)
</script>

<template>
  <div>
    <img class="avatar" :src="avatarUrl" alt="avatar">
  </div>
</template>
