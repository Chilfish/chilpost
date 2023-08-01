<script setup lang="ts">
import { posts } from '~/mock'
</script>

<template>
  <ul>
    <li v-for="post in posts" :key="post.id">
      <span>{{ post.owner.nick_name }}</span>
      <p>{{ post.content }}</p>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
ul {
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

li {
  margin: 1rem 0;
  width: 100%;

  &:hover {
    background: var(--hover-1);
  }
}

// img {
//   height: 300px;
//   border-radius: 8px;
// }
</style>
