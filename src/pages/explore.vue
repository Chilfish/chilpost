<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { computed } from 'vue'
import { posts } from '~/mock'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const darkStyle = computed(() => isDark.value
  ? {
      navBg: '#151515CC',
      icon: 'i-carbon-sun',
    }
  : {
      navBg: '#E7E7E7CC',
      icon: 'i-carbon-moon',
    },
)
</script>

<template>
  <nav :style="{ backgroundColor: darkStyle.navBg }">
    <div>
      <img class="logo" src="/favicon.ico">
      <span>Chill Post</span>
    </div>

    <span :class="darkStyle.icon" @click="toggleDark()" />
  </nav>
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
nav {
  width: 100%;
  height: 3rem;
  padding: 0 1rem;
  position: sticky;
  top: 0;
  backdrop-filter: blur(24px);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img.logo {
    padding: 0.3rem;
    margin-right: 1rem;
    height: 100%;
    border-radius: 12px;
  }
}

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
