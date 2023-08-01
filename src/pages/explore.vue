<script setup lang="ts">
import { posts } from '~/mock'
</script>

<template>
  <main>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <span>{{ post.owner.nick_name }}</span>
        <p>{{ post.content }}</p>
      </li>
    </ul>
  </main>
</template>

<style lang="scss" scoped>
main {
  width: 100%;
  padding: 0 0.5rem;

  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  li {
    margin: 1rem 0;
  }

  // img {
  //   height: 300px;
  //   border-radius: 8px;
  // }
}
</style>
