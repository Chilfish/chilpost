<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { computed } from 'vue'

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
  <header :style="{ backgroundColor: darkStyle.navBg }">
    <h2>Explore</h2>

    <span :class="darkStyle.icon" @click="toggleDark()" />
  </header>

  <main>
    <RouterView />
  </main>

  <nav :style="{ backgroundColor: darkStyle.navBg }">
    <div>
      <img class="logo" src="/favicon.ico">
      <h1>Chill Post</h1>
    </div>
    <router-link to="/">
      <span class="i-carbon-home" />
      <p>Explore</p>
    </router-link>

    <router-link to="/@Chilfish">
      <span class="i-carbon-user" />
      <p>Profile</p>
    </router-link>
  </nav>
</template>

<style lang="scss" scoped>
@import '../style';

$aside-width: 14rem;

header {
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
}

main {
  width: 100%;
}

nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3rem;
  backdrop-filter: blur(24px);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5rem;
  padding: 0.5rem 1rem;

  div {
    display: none;
  }
}

nav a {
  width: 30%;
  height: 100%;
  text-align: center;
  line-height: 3rem;
  font-size: 1.1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 12px;

  span {
    display: inline-block;
    width: 100%;
    height: 80%;
  }

  p {
    display: none;
  }
}

@media (min-width: $smd) {
  nav {
    width: $aside-width;
    height: 100%;
    flex-direction: column;
    justify-content: start;
    gap: 0.5rem;
    padding: 1rem;

    div {
      width: 100%;
      height: 3rem;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    h1 {
      font-size: 1.2rem;
    }

    img.logo {
      padding: 0.3rem;
      height: 100%;
      border-radius: 12px;
    }
  }

  nav a {
    height: 3rem;
    width: 100%;

    span {
      width: 2rem;
      height: 1.5rem;
    }

    p {
      font-size: 1rem;
      margin-left: 0.5rem;
      display: inline-block;
    }
  }

  header,
  main {
    margin-left: $aside-width;
    width: -webkit-fill-available;
    width: -moz-available;
  }
}
</style>
