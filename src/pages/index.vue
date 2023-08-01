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
    <div>
      <img class="logo" src="/favicon.ico">
      <span>Chill Post</span>
    </div>

    <span :class="darkStyle.icon" @click="toggleDark()" />
  </header>

  <main>
    <RouterView />
  </main>

  <footer>
    <nav :style="{ backgroundColor: darkStyle.navBg }">
      <router-link to="/">
        <span class="i-carbon-home" />
        <p>Explore</p>
      </router-link>

      <router-link to="/@Chilfish">
        <span class="i-carbon-user" />
        <p>Profile</p>
      </router-link>
    </nav>
  </footer>
</template>

<style lang="scss" scoped>
@import '../style.scss';

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
}

footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3rem;
  backdrop-filter: blur(24px);
  z-index: 999;

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  a {
    width: 30rem;
    height: 100%;
    padding: 0.5rem;
    text-align: center;
    line-height: 3rem;
    font-size: 1.1rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    border-radius: 12px;

    &:hover {
      background: #454545;
    }

    span {
      display: inline-block;
      width: 100%;
      height: 80%;
    }

    p {
      display: none;
    }
  }
}

@media (min-width: $smd) {
  footer {
    width: $aside-width;
    height: 100%;

    nav {
      flex-direction: column;
      justify-content: start;
      padding: 0.5rem;
    }

    a {
      margin-top: 0.5rem;
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
  }

  header,
  main {
    margin-left: $aside-width;
    width: -webkit-fill-available;
    width: -moz-available;
  }
}
</style>
